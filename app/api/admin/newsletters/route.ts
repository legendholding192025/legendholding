import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

// GET /api/admin/newsletters
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('newsletter_subscriptions')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching newsletter subscriptions:", error)
    return NextResponse.json(
      { error: "Failed to fetch newsletter subscriptions" },
      { status: 500 }
    )
  }
}

// POST /api/admin/newsletters
export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    // Check if email already exists
    const { data: existingSubscription } = await supabase
      .from('newsletter_subscriptions')
      .select('id')
      .eq('email', email)
      .single()

    if (existingSubscription) {
      return NextResponse.json(
        { error: "Email already subscribed" },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('newsletter_subscriptions')
      .insert([{ email, status: 'active' }])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error creating newsletter subscription:", error)
    return NextResponse.json(
      { error: "Failed to create newsletter subscription" },
      { status: 500 }
    )
  }
} 