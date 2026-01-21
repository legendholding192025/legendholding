import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await params in Next.js 15
    const { id } = await params

    // Check if service role key is available
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('SUPABASE_SERVICE_ROLE_KEY environment variable is not set')
      return NextResponse.json({ error: 'Service role key not configured' }, { status: 500 })
    }

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      console.error('NEXT_PUBLIC_SUPABASE_URL environment variable is not set')
      return NextResponse.json({ error: 'Supabase URL not configured' }, { status: 500 })
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

    // Use service role to get job by ID, bypassing RLS
    const { data: job, error } = await supabaseAdmin
      .from('jobs')
      .select('*')
      .eq('id', id)
      .eq('status', 'active')
      .single()

    if (error) {
      console.error('Error fetching job from database:', error)
      return NextResponse.json({ 
        error: 'Failed to fetch job from database', 
        details: error.message 
      }, { status: 500 })
    }

    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 })
    }

    console.log(`Successfully fetched job: ${job.title}`)
    return NextResponse.json(job)
  } catch (error) {
    console.error('Error in careers job API:', error)
    return NextResponse.json({ 
      error: 'Internal server error', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 