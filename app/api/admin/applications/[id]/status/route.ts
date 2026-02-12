import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { sendApplicationRejectionEmail } from '@/lib/email';

const VALID_STATUSES = ['pending', 'reviewed', 'shortlisted', 'rejected', 'hired'];

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: applicationId } = await params;
    if (!applicationId) {
      return NextResponse.json({ error: 'Application ID is required' }, { status: 400 });
    }

    const body = await request.json().catch(() => ({}));
    const { status: newStatus } = body;
    if (!newStatus || !VALID_STATUSES.includes(newStatus)) {
      return NextResponse.json(
        { error: `Status must be one of: ${VALID_STATUSES.join(', ')}` },
        { status: 400 }
      );
    }

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // Next.js 15: cookies() is async and must be awaited before use
    const cookieStore = await cookies();
    const supabaseAuth = createRouteHandlerClient({
      cookies: () => cookieStore,
    });
    const { data: { session } } = await supabaseAuth.auth.getSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const { data: roleData, error: roleError } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', session.user.id)
      .single();

    if (roleError || !roleData) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    const role = (roleData as { role: string }).role;
    if (role !== 'super_admin' && role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Rejected applications cannot be changed to any other status
    const { data: currentApp, error: currentError } = await supabase
      .from('job_applications')
      .select('status')
      .eq('id', applicationId)
      .single();

    if (currentError || !currentApp) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }
    const currentStatus = (currentApp as { status: string }).status;
    if (currentStatus === 'rejected') {
      return NextResponse.json(
        { error: 'Rejected applications cannot be changed.' },
        { status: 400 }
      );
    }

    if (newStatus === 'rejected') {
      // --- Daily rejection email limit: 50 per day ---
      const DAILY_REJECTION_LIMIT = 50;
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);

      const { count: todayRejectionCount, error: countError } = await supabase
        .from('job_applications')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'rejected')
        .gte('updated_at', todayStart.toISOString());

      if (countError) {
        console.error('Error checking daily rejection count:', countError);
      }

      if ((todayRejectionCount ?? 0) >= DAILY_REJECTION_LIMIT) {
        return NextResponse.json(
          {
            error: 'Daily rejection email limit reached (50/day). Please try again tomorrow.',
            emailLimitReached: true,
          },
          { status: 429 }
        );
      }
      // --- End limit check ---

      const { data: application, error: fetchError } = await supabase
        .from('job_applications')
        .select(`
          id,
          full_name,
          email,
          job:jobs(id, title, department)
        `)
        .eq('id', applicationId)
        .single();

      if (fetchError || !application) {
        return NextResponse.json({ error: 'Application not found' }, { status: 404 });
      }

      const job = Array.isArray((application as any).job) ? (application as any).job[0] : (application as any).job;
      const positionTitle = job?.title ?? 'the position you applied for';
      const fullName = (application as any).full_name ?? '';
      const applicantFirstName = fullName.trim().split(/\s+/)[0] || 'Applicant';
      const applicantEmail = (application as any).email;

      if (!applicantEmail) {
        return NextResponse.json({ error: 'Application has no email' }, { status: 400 });
      }

      const { error: updateError } = await supabase
        .from('job_applications')
        .update({ status: 'rejected' })
        .eq('id', applicationId);

      if (updateError) {
        return NextResponse.json({ error: updateError.message }, { status: 500 });
      }

      let emailSent = false;
      if (process.env.RESEND_API_KEY) {
        try {
          await sendApplicationRejectionEmail({
            applicantFirstName,
            applicantEmail,
            positionTitle,
          });
          emailSent = true;
        } catch (emailError) {
          console.error('Failed to send rejection email:', emailError);
        }
      }

      return NextResponse.json({ success: true, status: 'rejected', emailSent });
    }

    const { error: updateError } = await supabase
      .from('job_applications')
      .update({ status: newStatus })
      .eq('id', applicationId);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, status: newStatus });
  } catch (error) {
    console.error('Error updating application status:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
