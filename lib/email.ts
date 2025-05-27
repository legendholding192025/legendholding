import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactFormEmail(data: {
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
}) {
  try {
    const { name, email, phone, subject, message } = data;

    // In development, we'll use a verified email from Resend
    const fromEmail = process.env.NODE_ENV === 'development' 
      ? 'onboarding@resend.dev'  // Resend's testing email
      : 'no-reply@legendholding.com';

    const emailResponse = await resend.emails.send({
      from: fromEmail,
      to: ['Ashokpradhan199@gmail.com'], // Your email address
      replyTo: email, // The sender's email address
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #5E366D; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; background-color: #f9f9f9; }
              .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>New Contact Form Submission</h2>
              </div>
              <div class="content">
                <p><strong>From:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <h3>Message:</h3>
                <p>${message}</p>
              </div>
              <div class="footer">
                <p>This is an automated message from your website's contact form.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log('Email sent successfully:', emailResponse);
    return emailResponse;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
} 