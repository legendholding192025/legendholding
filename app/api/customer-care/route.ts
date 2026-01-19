import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendCustomerCareComplaintEmail } from '@/lib/email';
import { getCompanyEmail } from '@/lib/company-email-map';

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

    const body = await request.json();
    console.log('Received customer care form data:', body);

    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'company', 'subject', 'message'];
    for (const field of requiredFields) {
      if (!body[field]) {
        console.log('Missing required field:', field);
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
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

    // Get company email
    const companyEmail = getCompanyEmail(body.company);
    if (!companyEmail) {
      console.error(`No email address configured for company: ${body.company}`);
      // Still insert the complaint, but don't send email
      const { data, error } = await supabaseAdmin
        .from('customer_care_complaints')
        .insert([
          {
            name: body.name,
            email: body.email,
            phone: body.phone,
            company: body.company,
            subject: body.subject,
            message: body.message,
            status: 'pending',
            resolved: false
          }
        ])
        .select();

      if (error) {
        console.error('Supabase error:', error);
        return NextResponse.json(
          { error: error.message || 'Failed to submit customer care complaint' },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { 
          message: 'Customer care complaint submitted successfully',
          data: data[0],
          warning: 'Email not sent - company email not configured'
        },
        { status: 200 }
      );
    }

    // Insert into customer_care_complaints table with status 'sent'
    const { data, error } = await supabaseAdmin
      .from('customer_care_complaints')
      .insert([
        {
          name: body.name,
          email: body.email,
          phone: body.phone,
          company: body.company,
          subject: body.subject,
          message: body.message,
          status: 'sent',
          resolved: false
        }
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: error.message || 'Failed to submit customer care complaint' },
        { status: 500 }
      );
    }

    // Send email to company immediately
    try {
      await sendCustomerCareComplaintEmail({
        name: body.name,
        email: body.email,
        phone: body.phone,
        company: body.company,
        subject: body.subject,
        message: body.message,
        adminComment: null,
        companyEmail: companyEmail,
      });
      console.log('Email sent to company successfully');
    } catch (emailError: any) {
      console.error('Error sending email to company:', emailError);
      // Don't fail the request if email fails - complaint is already saved
    }

    console.log('Customer care complaint submitted successfully');
    return NextResponse.json(
      { 
        message: 'Customer care complaint submitted successfully',
        data: data[0]
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to submit customer care complaint' },
      { status: 500 }
    );
  }
}


