import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendCustomerCareComplaintEmail, getCompanyEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    // Check if service role key is available
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('SUPABASE_SERVICE_ROLE_KEY environment variable is not set');
      return NextResponse.json({ error: 'Service role key not configured' }, { status: 500 });
    }

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      console.error('NEXT_PUBLIC_SUPABASE_URL environment variable is not set');
      return NextResponse.json({ error: 'Supabase URL not configured' }, { status: 500 });
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY environment variable is not set');
      return NextResponse.json({ error: 'Resend API key not configured' }, { status: 500 });
    }

    const body = await request.json();
    const { complaintId, adminComment } = body;

    if (!complaintId) {
      return NextResponse.json(
        { error: 'Complaint ID is required' },
        { status: 400 }
      );
    }

    // Create a service role client that bypasses RLS
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    // Fetch the complaint
    const { data: complaint, error: fetchError } = await supabaseAdmin
      .from('customer_care_complaints')
      .select('*')
      .eq('id', complaintId)
      .single();

    if (fetchError || !complaint) {
      console.error('Error fetching complaint:', fetchError);
      return NextResponse.json(
        { error: 'Complaint not found' },
        { status: 404 }
      );
    }

    // Get company email
    const companyEmail = getCompanyEmail(complaint.company);
    if (!companyEmail) {
      return NextResponse.json(
        { error: `No email address configured for company: ${complaint.company}` },
        { status: 400 }
      );
    }

    // Send email
    try {
      await sendCustomerCareComplaintEmail({
        name: complaint.name,
        email: complaint.email,
        phone: complaint.phone,
        company: complaint.company,
        subject: complaint.subject,
        message: complaint.message,
        adminComment: adminComment || null,
        companyEmail: companyEmail,
      });

      // Update complaint with admin comment and mark as sent
      const updateData: any = {
        admin_comment: adminComment || null,
        status: 'sent',
      };

      const { error: updateError } = await supabaseAdmin
        .from('customer_care_complaints')
        .update(updateData)
        .eq('id', complaintId);

      if (updateError) {
        console.error('Error updating complaint:', updateError);
        // Don't fail the request if update fails, email was sent
      }

      return NextResponse.json(
        { 
          message: 'Email sent successfully',
          companyEmail: companyEmail
        },
        { status: 200 }
      );
    } catch (emailError: any) {
      console.error('Error sending email:', emailError);
      return NextResponse.json(
        { error: `Failed to send email: ${emailError.message || 'Unknown error'}` },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send email' },
      { status: 500 }
    );
  }
}
