import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// Simple UUID v4 format check to reject obviously invalid IDs early
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await params in Next.js 15
    const { id } = await params

    // Validate ID format before hitting the database
    if (!id || !UUID_REGEX.test(id)) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 })
    }

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

    // Use maybeSingle() instead of single() to avoid PGRST116 error when no rows match.
    // single() throws an error when 0 rows are found; maybeSingle() returns null data instead.
    const { data: job, error } = await supabaseAdmin
      .from('jobs')
      .select('*')
      .eq('id', id)
      .eq('status', 'active')
      .maybeSingle()

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

    // Return with cache headers to reduce redundant invocations
    return NextResponse.json(job, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    })
  } catch (error) {
    console.error('Error in careers job API:', error)
    return NextResponse.json({ 
      error: 'Internal server error', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 