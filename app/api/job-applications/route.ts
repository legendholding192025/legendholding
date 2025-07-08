import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    // Check if service role key is available
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('SUPABASE_SERVICE_ROLE_KEY environment variable is not set')
      return NextResponse.json({ error: 'Service role key not configured' }, { status: 500 })
    }

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      console.error('NEXT_PUBLIC_SUPABASE_URL environment variable is not set')
      return NextResponse.json({ error: 'Supabase URL not configured' }, { status: 500 })
    }

    // Parse the request body
    const applicationData = await request.json()
    
    // Validate required fields
    if (!applicationData.job_id || !applicationData.full_name || !applicationData.email || !applicationData.phone || !applicationData.resume_url) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
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
    )

    // Validate that the job exists and is active
    const { data: job, error: jobError } = await supabaseAdmin
      .from('jobs')
      .select('id, title, status')
      .eq('id', applicationData.job_id)
      .eq('status', 'active')
      .single()

    if (jobError) {
      console.error('Error validating job:', jobError)
      return NextResponse.json({ error: 'Invalid job reference' }, { status: 400 })
    }

    if (!job) {
      return NextResponse.json({ error: 'Job not found or is not active' }, { status: 404 })
    }

    // Check if user has already applied for this job
    const { data: existingApplication, error: checkError } = await supabaseAdmin
      .from('job_applications')
      .select('id')
      .eq('job_id', applicationData.job_id)
      .eq('email', applicationData.email.toLowerCase())
      .single()

    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is "not found" which is expected
      console.error('Error checking existing application:', checkError)
      return NextResponse.json({ error: 'Database error while checking application' }, { status: 500 })
    }

    if (existingApplication) {
      return NextResponse.json({ error: 'You have already applied for this position' }, { status: 409 })
    }

    // Insert the job application using service role
    const { data: newApplication, error: insertError } = await supabaseAdmin
      .from('job_applications')
      .insert({
        job_id: applicationData.job_id,
        full_name: applicationData.full_name.trim(),
        email: applicationData.email.trim().toLowerCase(),
        phone: applicationData.phone.trim(),
        resume_url: applicationData.resume_url,
        cover_letter: applicationData.cover_letter?.trim() || null,
        status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select('id')
      .single()

    if (insertError) {
      console.error('Error inserting application:', insertError)
      return NextResponse.json({ 
        error: 'Failed to submit application', 
        details: insertError.message 
      }, { status: 500 })
    }

    console.log(`Successfully created application: ${newApplication.id} for job: ${job.title}`)
    return NextResponse.json({ 
      success: true, 
      applicationId: newApplication.id,
      message: 'Application submitted successfully'
    })

  } catch (error) {
    console.error('Error in job applications API:', error)
    return NextResponse.json({ 
      error: 'Internal server error', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 