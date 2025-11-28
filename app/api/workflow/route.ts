import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendWorkflowApprovalEmail, sendWorkflowRejectionEmail } from '@/lib/email';

// Initialize Supabase client with service role for server-side operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Helper function to get MIME type from file extension
function getMimeTypeFromExtension(fileName: string): string | null {
  const extension = fileName.toLowerCase().split('.').pop();
  const mimeTypes: { [key: string]: string } = {
    'pdf': 'application/pdf',
    'doc': 'application/msword',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'xls': 'application/vnd.ms-excel',
    'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'ppt': 'application/vnd.ms-powerpoint',
    'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  };
  return extension ? mimeTypes[extension] || null : null;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;
    const files = formData.getAll('files') as File[];

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

    const filesData: Array<{
      fileName: string;
      fileUrl: string;
      fileType: string;
      fileSize: number;
    }> = [];

    // Handle multiple file uploads if provided
    if (files && files.length > 0) {
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      ];

      for (const file of files) {
        // Get MIME type - use file.type if available, otherwise detect from extension
        let mimeType = file.type;
        if (!mimeType || mimeType === '' || !allowedTypes.includes(mimeType)) {
          const detectedMimeType = getMimeTypeFromExtension(file.name);
          if (detectedMimeType) {
            mimeType = detectedMimeType;
          }
        }

        // Validate file type
        if (!mimeType || !allowedTypes.includes(mimeType)) {
          return NextResponse.json(
            { error: `Invalid file type for ${file.name}. Only PDF, DOC, DOCX, XLS, XLSX, PPT, and PPTX files are allowed.` },
            { status: 400 }
          );
        }

        // Validate file size (max 30MB)
        const maxSize = 30 * 1024 * 1024; // 30MB
        if (file.size > maxSize) {
          return NextResponse.json(
            { error: `File ${file.name} size must be less than 30MB` },
            { status: 400 }
          );
        }

        try {
          // Convert file to base64 for storage
          const arrayBuffer = await file.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          const base64 = buffer.toString('base64');
          const base64Data = `data:${mimeType};base64,${base64}`;

          filesData.push({
            fileName: file.name,
            fileUrl: base64Data,
            fileType: mimeType,
            fileSize: file.size,
          });
        } catch (error) {
          console.error('File processing error:', error);
          return NextResponse.json(
            { error: `Failed to process file ${file.name}` },
            { status: 500 }
          );
        }
      }
    }

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

// GET endpoint to retrieve workflow submissions (for admin)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

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
    const { id, status, reviewer, comment } = body;

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

