import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY || !process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('company_session')?.value;

    if (!sessionToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let companyId: string;
    try {
      const decoded = Buffer.from(sessionToken, 'base64').toString('utf-8');
      [companyId] = decoded.split(':');
    } catch {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const { data: company, error: companyError } = await supabase
      .from('company_credentials')
      .select('company_name')
      .eq('id', companyId)
      .single();

    if (companyError || !company) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: complaints, error } = await supabase
      .from('customer_care_complaints')
      .select('*')
      .eq('company', company.company_name)
      .in('status', ['sent', 'reviewed', 'replied'])
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching company complaints:', error);
      return NextResponse.json({ error: 'Failed to fetch complaints' }, { status: 500 });
    }

    const resolvedComplaints = await supabase
      .from('customer_care_complaints')
      .select('*')
      .eq('company', company.company_name)
      .eq('resolved', true)
      .order('created_at', { ascending: false });

    const allComplaints = [...(complaints || [])];
    if (resolvedComplaints.data) {
      for (const rc of resolvedComplaints.data) {
        if (!allComplaints.find(c => c.id === rc.id)) {
          allComplaints.push(rc);
        }
      }
    }

    allComplaints.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return NextResponse.json({ complaints: allComplaints });
  } catch (error: unknown) {
    console.error('Company complaints fetch error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch complaints' },
      { status: 500 }
    );
  }
}
