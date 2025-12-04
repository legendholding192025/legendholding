import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendWorkflowApprovalEmail, sendWorkflowRejectionEmail } from '@/lib/email';

// Route segment config - increase body size limit to 30MB
export const runtime = 'nodejs';
export const maxDuration = 30;

// Initialize Supabase client with service role for server-side operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;


export async function POST(request: Request) {
  try {
      // Parse JSON body (files are now uploaded directly to Supabase Storage)
      const body = await request.json();
      const { name, email, subject, message, files: uploadedFiles } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Name, email, subject, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Files are already uploaded to Supabase Storage, just use the URLs
    const filesData = uploadedFiles || [];

    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    // Insert submission into database
    const { data, error } = await supabase
      .from('workflow_submissions')
      .insert([
        {
          name,
          email,
          subject,
          message,
          files: filesData.length > 0 ? filesData : [],
          status: 'pending',
        },
      ])
      .select();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: `Failed to submit workflow document: ${error.message || JSON.stringify(error)}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        message: 'Workflow document submitted successfully',
        data: data[0]
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to submit workflow document' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve workflow submissions (for admin or user)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const email = searchParams.get('email'); // Filter by user email

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    let query = supabase
      .from('workflow_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    // Filter by email if provided (for user-specific submissions)
    if (email) {
      query = query.eq('email', email);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch workflow submissions' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { data },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch workflow submissions' },
      { status: 500 }
    );
  }
}

// PATCH endpoint to update workflow submission status (approve/reject)
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status, reviewer, comment, submitterSignature, founderSignature } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: 'ID and status are required' },
        { status: 400 }
      );
    }

    // Validate status
    const validStatuses = ['pending', 'finance_approved', 'finance_rejected', 'cofounder_approved', 'cofounder_rejected', 'approved', 'founder_rejected'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be: pending, finance_approved, finance_rejected, cofounder_approved, cofounder_rejected, approved, or founder_rejected' },
        { status: 400 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    // Prepare update data based on reviewer
    const updateData: any = { status };
    
    if (reviewer === 'finance' && (status === 'finance_approved' || status === 'finance_rejected')) {
      updateData.finance_reviewed_at = new Date().toISOString();
      if (comment) updateData.finance_comment = comment;
    } else if (reviewer === 'cofounder' && (status === 'cofounder_approved' || status === 'cofounder_rejected')) {
      updateData.cofounder_reviewed_at = new Date().toISOString();
      if (comment) updateData.cofounder_comment = comment;
    } else if (reviewer === 'founder' && (status === 'approved' || status === 'founder_rejected')) {
      updateData.founder_reviewed_at = new Date().toISOString();
      if (comment) updateData.founder_comment = comment;
      // Store both signatures for approval
      if (status === 'approved') {
        if (submitterSignature) updateData.submitter_signature = submitterSignature;
        if (founderSignature) updateData.founder_signature = founderSignature;
      }
    }

    // First, fetch the submission to get submitter details for email
    const { data: submissionData, error: fetchError } = await supabase
      .from('workflow_submissions')
      .select('name, email, subject, finance_comment, cofounder_comment, founder_comment')
      .eq('id', id)
      .single();

    if (fetchError) {
      console.error('Error fetching submission:', fetchError);
      return NextResponse.json(
        { error: 'Failed to fetch workflow submission' },
        { status: 500 }
      );
    }

    // Update the submission
    const { data, error } = await supabase
      .from('workflow_submissions')
      .update(updateData)
      .eq('id', id)
      .select();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to update workflow submission' },
        { status: 500 }
      );
    }

    // Send email notifications based on status
    try {
      // Send rejection email immediately for any rejection
      if (status === 'finance_rejected' || status === 'cofounder_rejected' || status === 'founder_rejected') {
        await sendWorkflowRejectionEmail({
          name: submissionData.name,
          email: submissionData.email,
          subject: submissionData.subject,
          reviewer: reviewer as 'finance' | 'cofounder' | 'founder',
          comment: comment || null,
        });
      }
      
      // Send approval email only when Founder approves (final approval)
      if (status === 'approved' && reviewer === 'founder') {
        await sendWorkflowApprovalEmail({
          name: submissionData.name,
          email: submissionData.email,
          subject: submissionData.subject,
          comment: comment || null,
        });
      }
      
      // Note: We don't send emails for finance_approved or cofounder_approved
      // as these are intermediate approvals, not final
    } catch (emailError) {
      // Log email error but don't fail the request
      console.error('Error sending email notification:', emailError);
      // Continue with the response even if email fails
    }

    return NextResponse.json(
      { 
        message: 'Workflow submission updated successfully',
        data: data[0]
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update workflow submission' },
      { status: 500 }
    );
  }
}

// DELETE endpoint to delete workflow submission
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const email = searchParams.get('email'); // Email for ownership validation

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    // If email is provided, validate ownership before deleting
    if (email) {
      const { data: submission, error: fetchError } = await supabase
        .from('workflow_submissions')
        .select('email')
        .eq('id', id)
        .single();

      if (fetchError) {
        console.error('Error fetching submission:', fetchError);
        return NextResponse.json(
          { error: 'Submission not found' },
          { status: 404 }
        );
      }

      if (submission.email !== email) {
        return NextResponse.json(
          { error: 'You can only delete your own submissions' },
          { status: 403 }
        );
      }
    }

    // Delete files from storage if they exist
    const { data: submissionData } = await supabase
      .from('workflow_submissions')
      .select('files')
      .eq('id', id)
      .single();

    if (submissionData?.files && Array.isArray(submissionData.files)) {
      // Delete files from Supabase Storage
      for (const file of submissionData.files) {
        if (file.fileUrl) {
          try {
            // Extract file path from URL
            // URL format: https://[project].supabase.co/storage/v1/object/public/workflow-documents/workflow/[filename]
            const urlParts = file.fileUrl.split('/workflow-documents/');
            if (urlParts.length > 1) {
              // The path after /workflow-documents/ is the file path in storage
              const filePath = urlParts[1];
              const { error: storageError } = await supabase.storage
                .from('workflow-documents')
                .remove([filePath]);
              
              if (storageError) {
                console.error('Error deleting file from storage:', storageError);
                // Continue with database deletion even if file deletion fails
              }
            }
          } catch (storageError) {
            console.error('Error deleting file from storage:', storageError);
            // Continue with database deletion even if file deletion fails
          }
        }
      }
    }

    // Delete submission from database
    const { error } = await supabase
      .from('workflow_submissions')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to delete workflow submission' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Workflow submission deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete workflow submission' },
      { status: 500 }
    );
  }
}

