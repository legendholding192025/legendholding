import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { Resend } from 'resend';
import { getCompanyEmail } from '@/lib/company-email-map';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY || !process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
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

      // Verify complaint status is 'reviewed'
      if (complaint.status !== 'reviewed') {
        return NextResponse.json(
          { error: 'Complaint must be reviewed before sending reply' },
          { status: 400 }
        );
      }

      // Get request body
      const body = await request.json();
      const { replyMessage } = body;

      if (!replyMessage || !replyMessage.trim()) {
        return NextResponse.json(
          { error: 'Reply message is required' },
          { status: 400 }
        );
      }

      // Get company email for Reply-To
      const companyEmail = getCompanyEmail(complaint.company);
      if (!companyEmail) {
        return NextResponse.json(
          { error: `No email address configured for company: ${complaint.company}` },
          { status: 400 }
        );
      }

      // Send reply email to customer
      try {
        const emailResponse = await resend.emails.send({
          from: 'complaints@legendholding.com',
          to: [complaint.email],
          replyTo: [companyEmail, 'complaints@legendholding.com'],
          subject: `Re: ${complaint.subject}`,
          html: `
            <!DOCTYPE html>
            <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: Arial, Helvetica, sans-serif;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f5f5f5;">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="background-color: #ffffff; max-width: 600px;">
                      
                      <!-- Header -->
                      <tr>
                        <td style="background-color: #5D376E; padding: 40px 30px; text-align: center;">
                          <h1 style="margin: 0; padding: 0; font-size: 28px; font-weight: bold; color: #ffffff; font-family: Arial, Helvetica, sans-serif;">Response to Your Complaint</h1>
                        </td>
                      </tr>
                      
                      <!-- Content -->
                      <tr>
                        <td style="padding: 40px 30px; background-color: #ffffff;">
                          <p style="margin: 0 0 25px 0; padding: 0; font-size: 16px; color: #4b5563; line-height: 1.6; font-family: Arial, Helvetica, sans-serif;">
                            Dear ${complaint.name},
                          </p>
                          
                          <p style="margin: 0 0 25px 0; padding: 0; font-size: 16px; color: #4b5563; line-height: 1.6; font-family: Arial, Helvetica, sans-serif;">
                            Thank you for contacting us regarding your complaint. We have reviewed your concern and would like to provide the following response:
                          </p>
                          
                          <!-- Reply Message Box -->
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f0f9ff; border-left: 4px solid #5D376E; margin: 25px 0;">
                            <tr>
                              <td style="padding: 20px;">
                                <p style="margin: 0; padding: 0; font-size: 14px; color: #374151; line-height: 1.6; font-family: Arial, Helvetica, sans-serif; white-space: pre-wrap;">${replyMessage.replace(/\n/g, '<br>')}</p>
                              </td>
                            </tr>
                          </table>
                          
                          <p style="margin: 25px 0 0 0; padding: 0; font-size: 16px; color: #4b5563; line-height: 1.6; font-family: Arial, Helvetica, sans-serif;">
                            If you have any further questions or concerns, please do not hesitate to contact us.
                          </p>
                          
                          <p style="margin: 25px 0 0 0; padding: 0; font-size: 16px; color: #4b5563; line-height: 1.6; font-family: Arial, Helvetica, sans-serif;">
                            Best regards,<br>
                            ${company.company_name}<br>
                            Legend Holding Group
                          </p>
                        </td>
                      </tr>
                      
                      <!-- Important Notice -->
                      <tr>
                        <td style="padding: 20px 30px; background-color: #fef3c7; border-left: 4px solid #f59e0b;">
                          <p style="margin: 0; padding: 0; font-size: 14px; color: #92400e; line-height: 1.6; font-family: Arial, Helvetica, sans-serif;">
                            <strong>📧 Important:</strong> When replying to this email, please ensure <strong>complaints@legendholding.com</strong> is included in CC for tracking purposes.
                          </p>
                        </td>
                      </tr>
                      
                      <!-- Footer -->
                      <tr>
                        <td style="background-color: #f3f4f6; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                          <p style="margin: 0 0 10px 0; padding: 0; font-size: 14px; color: #6b7280; line-height: 1.8; font-family: Arial, Helvetica, sans-serif;">
                            This is a response to your complaint submitted on ${new Date(complaint.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}.
                          </p>
                          <p style="margin: 0; padding: 0; font-size: 12px; color: #9ca3af; line-height: 1.8; font-family: Arial, Helvetica, sans-serif;">© ${new Date().getFullYear()} Legend Holding Group. All rights reserved.</p>
                        </td>
                      </tr>
                      
                    </table>
                  </td>
                </tr>
              </table>
            </body>
            </html>
          `,
        });

        if (emailResponse.error) {
          console.error('Error sending reply email:', emailResponse.error);
          return NextResponse.json(
            { error: 'Failed to send reply email' },
            { status: 500 }
          );
        }

        // Update complaint status to 'replied'
        const { error: updateError } = await supabase
          .from('customer_care_complaints')
          .update({ status: 'replied' })
          .eq('id', id);

        if (updateError) {
          console.error('Error updating complaint status:', updateError);
          // Don't fail the request if update fails, email was sent
        }

        return NextResponse.json(
          { success: true, message: 'Reply sent successfully' },
          { status: 200 }
        );
      } catch (emailError: any) {
        console.error('Error sending reply email:', emailError);
        return NextResponse.json(
          { error: `Failed to send reply email: ${emailError.message || 'Unknown error'}` },
          { status: 500 }
        );
      }
    } catch (decodeError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  } catch (error: any) {
    console.error('Error sending company reply:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send reply' },
      { status: 500 }
    );
  }
}
