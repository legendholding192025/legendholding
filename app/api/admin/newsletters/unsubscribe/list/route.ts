import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    const { data: requests, error } = await supabase
      .from('unsubscribe_requests')
      .select(`
        *,
        newsletter_subscription:newsletter_subscriptions (
          email
        )
      `)
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(requests)
  } catch (error) {
    console.error("Error fetching unsubscribe requests:", error)
    return NextResponse.json(
      { error: "Failed to fetch unsubscribe requests" },
      { status: 500 }
    )
  }
} 