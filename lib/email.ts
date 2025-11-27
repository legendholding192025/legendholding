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

    // Use your verified domain email address
    const fromEmail = 'no-reply@legendholding.com';
    
    // Contact form submissions go to the configured email address
    // Set CONTACT_FORM_RECIPIENT_EMAIL in .env.local or use default
    const recipientEmail = process.env.CONTACT_FORM_RECIPIENT_EMAIL || 'info@legendholding.com';

    const emailResponse = await resend.emails.send({
      from: fromEmail,
      to: [recipientEmail],
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

export async function sendWorkflowApprovalEmail(data: {
  name: string;
  email: string;
  subject: string;
  comment?: string | null;
}) {
  try {
    const { name, email, subject, comment } = data;

    // Use your verified domain email address
    const fromEmail = 'no-reply@legendholding.com';

    const emailResponse = await resend.emails.send({
      from: fromEmail,
      to: [email],
      subject: `Workflow Submission Approved: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #5E366D; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { padding: 30px; background-color: #f9f9f9; }
              .approval-badge { background-color: #10b981; color: white; padding: 10px 20px; border-radius: 5px; display: inline-block; margin: 20px 0; }
              .info-box { background-color: #e0f2fe; border-left: 4px solid #0284c7; padding: 15px; margin: 20px 0; border-radius: 4px; }
              .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; background-color: #f3f4f6; border-radius: 0 0 8px 8px; }
              .button { display: inline-block; padding: 12px 24px; background-color: #5E366D; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>🎉 Workflow Submission Approved</h2>
              </div>
              <div class="content">
                <p>Dear ${name},</p>
                <p>We are pleased to inform you that your workflow submission has been <strong>fully approved</strong> by all reviewers.</p>
                
                <div style="text-align: center;">
                  <div class="approval-badge">
                    ✓ APPROVED
                  </div>
                </div>

                <div class="info-box">
                  <p><strong>Submission Details:</strong></p>
                  <p><strong>Subject:</strong> ${subject}</p>
                  <p><strong>Status:</strong> Fully Approved</p>
                </div>

                ${comment ? `
                <div class="info-box" style="background-color: #f0fdf4; border-left-color: #10b981;">
                  <p><strong>Final Review Comment:</strong></p>
                  <p>${comment.replace(/\n/g, '<br>')}</p>
                </div>
                ` : ''}

                <p>Your submission has successfully completed the approval workflow and has been processed.</p>
                
                <p>If you have any questions or need further assistance, please don't hesitate to contact us.</p>
              </div>
              <div class="footer">
                <p>This is an automated message from Legend Holding Group.</p>
                <p>Please do not reply to this email.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log('Workflow approval email sent successfully:', emailResponse);
    return emailResponse;
  } catch (error) {
    console.error('Error sending workflow approval email:', error);
    throw error;
  }
}

export async function sendWorkflowRejectionEmail(data: {
  name: string;
  email: string;
  subject: string;
  reviewer: 'finance' | 'cofounder' | 'founder';
  comment?: string | null;
}) {
  try {
    const { name, email, subject, reviewer, comment } = data;

    // Use your verified domain email address
    const fromEmail = 'no-reply@legendholding.com';

    const reviewerName = reviewer === 'finance' 
      ? 'Finance Team' 
      : reviewer === 'cofounder' 
      ? 'Co-Founder' 
      : 'Founder';

    const emailResponse = await resend.emails.send({
      from: fromEmail,
      to: [email],
      subject: `Workflow Submission Update: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #dc2626; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { padding: 30px; background-color: #f9f9f9; }
              .rejection-badge { background-color: #dc2626; color: white; padding: 10px 20px; border-radius: 5px; display: inline-block; margin: 20px 0; }
              .info-box { background-color: #fee2e2; border-left: 4px solid #dc2626; padding: 15px; margin: 20px 0; border-radius: 4px; }
              .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; background-color: #f3f4f6; border-radius: 0 0 8px 8px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>Workflow Submission Update</h2>
              </div>
              <div class="content">
                <p>Dear ${name},</p>
                <p>We regret to inform you that your workflow submission has been <strong>rejected</strong> during the review process.</p>
                
                <div style="text-align: center;">
                  <div class="rejection-badge">
                    ✗ REJECTED
                  </div>
                </div>

                <div class="info-box">
                  <p><strong>Submission Details:</strong></p>
                  <p><strong>Subject:</strong> ${subject}</p>
                  <p><strong>Reviewed By:</strong> ${reviewerName}</p>
                  <p><strong>Status:</strong> Rejected</p>
                </div>

                ${comment ? `
                <div class="info-box" style="background-color: #fef2f2; border-left-color: #dc2626;">
                  <p><strong>Review Comment:</strong></p>
                  <p>${comment.replace(/\n/g, '<br>')}</p>
                </div>
                ` : ''}

                <p>Please review the feedback above and feel free to submit a new request with the necessary corrections.</p>
                
                <p>If you have any questions or need clarification, please don't hesitate to contact us.</p>
              </div>
              <div class="footer">
                <p>This is an automated message from Legend Holding Group.</p>
                <p>Please do not reply to this email.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log('Workflow rejection email sent successfully:', emailResponse);
    return emailResponse;
  } catch (error) {
    console.error('Error sending workflow rejection email:', error);
    throw error;
  }
} 