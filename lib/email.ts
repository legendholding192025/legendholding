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
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; 
                line-height: 1.6; 
                color: #333333; 
                background-color: #f5f5f5;
                padding: 20px;
              }
              .email-container { 
                max-width: 600px; 
                margin: 0 auto; 
                background-color: #ffffff;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              }
              .header { 
                background: linear-gradient(135deg, #5D376E 0%, #7B4A8F 100%);
                color: white; 
                padding: 40px 30px;
                text-align: center;
              }
              .header h1 {
                font-size: 28px;
                font-weight: 700;
                margin-bottom: 10px;
                color: white;
              }
              .content { 
                padding: 40px 30px; 
                background-color: #ffffff;
              }
              .greeting {
                font-size: 18px;
                color: #5D376E;
                font-weight: 600;
                margin-bottom: 20px;
              }
              .approval-badge { 
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                color: white; 
                padding: 16px 32px; 
                border-radius: 8px; 
                display: inline-block; 
                margin: 30px 0;
                font-size: 18px;
                font-weight: 700;
                box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
              }
              .info-box { 
                background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
                border-left: 4px solid #5D376E; 
                padding: 20px; 
                margin: 25px 0; 
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
              }
              .info-box strong {
                color: #5D376E;
                font-size: 16px;
                display: block;
                margin-bottom: 10px;
              }
              .comment-box {
                background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
                border-left: 4px solid #10b981;
                padding: 20px;
                margin: 25px 0;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
              }
              .comment-box strong {
                color: #059669;
                font-size: 16px;
                display: block;
                margin-bottom: 10px;
              }
              .footer { 
                text-align: center; 
                padding: 30px; 
                color: #666666; 
                font-size: 14px; 
                background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
                border-top: 1px solid #e5e7eb;
              }
              .footer-text {
                color: #6b7280;
                line-height: 1.8;
              }
              .divider {
                height: 1px;
                background: linear-gradient(90deg, transparent, #e5e7eb, transparent);
                margin: 30px 0;
              }
              @media only screen and (max-width: 600px) {
                .content { padding: 30px 20px; }
                .header { padding: 30px 20px; }
                .header h1 { font-size: 24px; }
              }
            </style>
          </head>
          <body>
            <div class="email-container">
              <div class="header">
                <h1>✓ Submission Approved</h1>
                <p style="margin-top: 10px; opacity: 0.95;">Your workflow has been fully approved</p>
              </div>
              <div class="content">
                <p class="greeting">Dear ${name},</p>
                
                <p style="font-size: 16px; color: #4b5563; margin-bottom: 25px;">
                  We are pleased to inform you that your workflow submission has been <strong style="color: #5D376E;">fully approved</strong> by all reviewers and has successfully completed the approval process.
                </p>
                
                <div style="text-align: center;">
                  <div class="approval-badge">
                    ✓ FULLY APPROVED
                  </div>
                </div>

                <div class="info-box">
                  <strong>📋 Submission Details</strong>
                  <p style="margin: 8px 0; color: #374151;"><strong>Subject:</strong> ${subject}</p>
                  <p style="margin: 8px 0; color: #374151;"><strong>Status:</strong> <span style="color: #10b981; font-weight: 600;">Fully Approved</span></p>
                </div>

                ${comment ? `
                <div class="comment-box">
                  <strong>💬 Final Review Comment</strong>
                  <p style="margin-top: 10px; color: #374151; white-space: pre-wrap;">${comment.replace(/\n/g, '<br>')}</p>
                </div>
                ` : ''}

                <div class="divider"></div>

                <p style="font-size: 16px; color: #4b5563; margin-bottom: 15px;">
                  Your submission has been processed and is now complete. If you have any questions or need further assistance, please don't hesitate to contact us.
                </p>
              </div>
              <div class="footer">
                <p class="footer-text">
                  <strong>Legend Holding Group</strong><br>
                  This is an automated message. Please do not reply to this email.<br>
                  <span style="color: #9ca3af; font-size: 12px;">© ${new Date().getFullYear()} Legend Holding Group. All rights reserved.</span>
                </p>
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
      ? 'Finance' 
      : reviewer === 'cofounder' 
      ? 'Co-Founder' 
      : 'Founder';

    // Extract first name from full name
    const firstName = name.split(' ')[0];

    const emailResponse = await resend.emails.send({
      from: fromEmail,
      to: [email],
      subject: `Workflow Submission Update: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; 
                line-height: 1.6; 
                color: #333333; 
                background-color: #f5f5f5;
                padding: 20px;
              }
              .email-container { 
                max-width: 600px; 
                margin: 0 auto; 
                background-color: #ffffff;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              }
              .header { 
                background: linear-gradient(135deg, #5D376E 0%, #7B4A8F 100%);
                color: white; 
                padding: 40px 30px;
                text-align: center;
              }
              .header h1 {
                font-size: 28px;
                font-weight: 700;
                margin-bottom: 10px;
                color: white;
              }
              .content { 
                padding: 40px 30px; 
                background-color: #ffffff;
              }
              .greeting {
                font-size: 18px;
                color: #5D376E;
                font-weight: 600;
                margin-bottom: 20px;
              }
              .rejection-badge { 
                background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
                color: white; 
                padding: 16px 32px; 
                border-radius: 8px; 
                display: inline-block; 
                margin: 30px 0;
                font-size: 18px;
                font-weight: 700;
                box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
              }
              .info-box { 
                background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
                border-left: 4px solid #dc2626; 
                padding: 20px; 
                margin: 25px 0; 
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
              }
              .info-box strong {
                color: #991b1b;
                font-size: 16px;
                display: block;
                margin-bottom: 10px;
              }
              .comment-box {
                background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
                border-left: 4px solid #EE8900;
                padding: 20px;
                margin: 25px 0;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
              }
              .comment-box strong {
                color: #c2410c;
                font-size: 16px;
                display: block;
                margin-bottom: 10px;
              }
              .reviewer-badge {
                display: inline-block;
                background: linear-gradient(135deg, #5D376E 0%, #7B4A8F 100%);
                color: white;
                padding: 8px 16px;
                border-radius: 6px;
                font-size: 14px;
                font-weight: 600;
                margin-top: 5px;
              }
              .footer { 
                text-align: center; 
                padding: 30px; 
                color: #666666; 
                font-size: 14px; 
                background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
                border-top: 1px solid #e5e7eb;
              }
              .footer-text {
                color: #6b7280;
                line-height: 1.8;
              }
              .divider {
                height: 1px;
                background: linear-gradient(90deg, transparent, #e5e7eb, transparent);
                margin: 30px 0;
              }
              @media only screen and (max-width: 600px) {
                .content { padding: 30px 20px; }
                .header { padding: 30px 20px; }
                .header h1 { font-size: 24px; }
              }
            </style>
          </head>
          <body>
            <div class="email-container">
              <div class="header">
                <h1>Submission Update</h1>
                <p style="margin-top: 10px; opacity: 0.95;">Review status notification</p>
              </div>
              <div class="content">
                <p class="greeting">Dear ${firstName},</p>
                
                <p style="font-size: 16px; color: #4b5563; margin-bottom: 25px;">
                  Unfortunately the Annual plan need more modification, please review the comments and re-upload again.
                </p>
                
                <div style="text-align: center;">
                  <div class="rejection-badge">
                    REJECTED BY ${reviewerName.toUpperCase()}
                  </div>
                </div>

                <div class="info-box">
                  <strong>📋 Submission Details</strong>
                  <p style="margin: 8px 0; color: #374151;"><strong>Subject:</strong> ${subject}</p>
                  <p style="margin: 8px 0; color: #374151;"><strong>Rejected by:</strong> <span style="color: #5D376E; font-weight: 600;">${reviewerName}</span></p>
                  <p style="margin: 8px 0; color: #374151;"><strong>Status:</strong> <span style="color: #dc2626; font-weight: 600;">Rejected</span></p>
                </div>

                ${comment ? `
                <div class="comment-box">
                  <strong>💬 Review Comment</strong>
                  <p style="margin-top: 10px; color: #374151; white-space: pre-wrap;">${comment.replace(/\n/g, '<br>')}</p>
                </div>
                ` : ''}

                <div class="divider"></div>

                <p style="font-size: 16px; color: #4b5563; margin-bottom: 15px;">
                  Thank you for understanding.
                </p>
              </div>
              <div class="footer">
                <p class="footer-text">
                  <strong>Legend Holding Group</strong><br>
                  This is an automated message. Please do not reply to this email.<br>
                  <span style="color: #9ca3af; font-size: 12px;">© ${new Date().getFullYear()} Legend Holding Group. All rights reserved.</span>
                </p>
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