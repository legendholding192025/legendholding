import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { sendContactFormEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Insert into contact_submissions table
    const { data: submissionData, error: submissionError } = await supabase
      .from("contact_submissions")
      .insert([
        {
          name,
          email,
          phone: phone || null,
          subject,
          message,
        },
      ])
      .select()
      .single();

    if (submissionError) {
      console.error("Error submitting to contact_submissions:", submissionError);
      return NextResponse.json(
        { error: "Failed to submit contact form" },
        { status: 500 }
      );
    }

    // Create notification
    const { error: notificationError } = await supabase
      .from("notifications")
      .insert([
        {
          type: "contact_form",
          title: "New Contact Form Submission",
          description: `${name} submitted a contact form about "${subject}"`,
          read: false,
          submission_id: submissionData.id
        }
      ]);

    if (notificationError) {
      console.error("Error creating notification:", notificationError);
      // Don't return here as the submission was successful
    }

    // Send email notification
    await sendContactFormEmail({
      name,
      email,
      phone,
      subject,
      message
    });

    return NextResponse.json(
      { message: "Contact form submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in contact form submission:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 