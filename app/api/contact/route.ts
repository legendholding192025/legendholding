import { NextResponse } from 'next/server';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export async function POST(request: Request) {
  const supabase = createClientComponentClient();
  
  try {
    const body = await request.json();
    console.log('Received form data:', body);

    // Validate required fields
    const requiredFields = ['name', 'email', 'subject', 'message'];
    for (const field of requiredFields) {
      if (!body[field]) {
        console.log('Missing required field:', field);
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Insert into contact_submissions table
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name: body.name,
          email: body.email,
          phone: body.phone || null,
          subject: body.subject,
          message: body.message,
          status: 'pending'
        }
      ]);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: error.message || 'Failed to submit contact form' },
        { status: 500 }
      );
    }

    console.log('Form submitted successfully');
    return NextResponse.json(
      { message: 'Contact form submitted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to submit contact form' },
      { status: 500 }
    );
  }
} 