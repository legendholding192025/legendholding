import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(req: Request) {
  try {
    const { email, reason } = await req.json()

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      )
    }

    console.log("Processing unsubscribe request for email:", email)

    // Check if the email exists and is active
    const { data: subscription, error: subscriptionError } = await supabase
      .from('newsletter_subscriptions')
      .select('id')
      .eq('email', email.toLowerCase())
      .eq('status', 'active')
      .single()

    if (subscriptionError || !subscription) {
      return NextResponse.json(
        { error: "No active subscription found for this email" },
        { status: 404 }
      )
    }

    // Check for existing pending requests
    const { data: pendingRequests, error: pendingError } = await supabase
      .from('unsubscribe_requests')
      .select('id')
      .eq('newsletter_subscription_id', subscription.id)
      .eq('status', 'pending')

    if (pendingError) throw pendingError

    if (pendingRequests && pendingRequests.length > 0) {
      return NextResponse.json(
        { error: "There is already a pending unsubscribe request for this email" },
        { status: 400 }
      )
    }

    // Create an unsubscribe request
    const { error: insertError } = await supabase
      .from('unsubscribe_requests')
      .insert([{
        newsletter_subscription_id: subscription.id,
        reason: reason || 'No reason provided',
        status: 'pending'
      }])

    if (insertError) throw insertError

    return NextResponse.json(
      { 
        message: "Unsubscribe request submitted successfully. You will receive a confirmation email once approved." 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error("Error in unsubscribe request:", error)
    return NextResponse.json(
      { 
        error: "Failed to process unsubscribe request",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    )
  }
} 