import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY || !process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // Await params in Next.js 15
    const { id } = await params;

    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('company_session')?.value;

    if (!sessionToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify company session
    try {
      const decoded = Buffer.from(sessionToken, 'base64').toString('utf-8');
      const [companyId] = decoded.split(':');

      // Create Supabase client
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY,
        {
          auth: {
            autoRefreshToken: false,
            persistSession: false
          }
        }
      );

      // Verify company exists
      const { data: company, error: companyError } = await supabase
        .from('company_credentials')
        .select('company_name')
        .eq('id', companyId)
        .single();

      if (companyError || !company) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      // Get complaint and verify it belongs to this company
      const { data: complaint, error: complaintError } = await supabase
        .from('customer_care_complaints')
        .select('*')
        .eq('id', id)
        .eq('company', company.company_name)
        .single();

      if (complaintError || !complaint) {
        return NextResponse.json(
          { error: 'Complaint not found or access denied' },
          { status: 404 }
        );
      }

      // Verify complaint status is 'replied'
      if (complaint.status !== 'replied') {
        return NextResponse.json(
          { error: 'Complaint must be replied before marking as resolved' },
          { status: 400 }
        );
      }

      // Get request body
      const body = await request.json();
      const { companyComment } = body;

      if (!companyComment || !companyComment.trim()) {
        return NextResponse.json(
          { error: 'Resolution comment is required' },
          { status: 400 }
        );
      }

      // Update complaint to resolved with company comment
      const { error: updateError } = await supabase
        .from('customer_care_complaints')
        .update({ 
          resolved: true,
          company_comment: companyComment.trim()
        })
        .eq('id', id);

      if (updateError) {
        console.error('Error updating complaint status:', updateError);
        return NextResponse.json(
          { error: 'Failed to mark complaint as resolved' },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { success: true, message: 'Complaint marked as resolved' },
        { status: 200 }
      );
    } catch (decodeError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  } catch (error: any) {
    console.error('Error marking complaint as resolved:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update complaint' },
      { status: 500 }
    );
  }
}
