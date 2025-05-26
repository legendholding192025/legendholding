import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(req: Request) {
  try {
    const { requestId, action, adminComment } = await req.json()

    if (!requestId || !action) {
      return NextResponse.json(
        { error: "Request ID and action are required" },
        { status: 400 }
      )
    }

    if (!["approve", "reject"].includes(action)) {
      return NextResponse.json(
        { error: "Invalid action. Must be either 'approve' or 'reject'" },
        { status: 400 }
      )
    }

    // Find the unsubscribe request with the associated email
    const { data: requests, error: requestError } = await supabase
      .from('unsubscribe_requests')
      .select(`
        *,
        newsletter_subscription:newsletter_subscriptions (
          email
        )
      `)
      .eq('id', requestId)
      .single()

    if (requestError || !requests) {
      return NextResponse.json(
        { error: "Unsubscribe request not found" },
        { status: 404 }
      )
    }

    if (requests.status !== "pending") {
      return NextResponse.json(
        { error: "This request has already been processed" },
        { status: 400 }
      )
    }

    // Update the request status
    const { error: updateError } = await supabase
      .from('unsubscribe_requests')
      .update({
        status: action === "approve" ? "approved" : "rejected",
        admin_comment: adminComment || null,
        processed_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', requestId)

    if (updateError) throw updateError

    // If approved, update the newsletter subscription status
    if (action === "approve") {
      const { error: subscriptionError } = await supabase
        .from('newsletter_subscriptions')
        .update({
          status: 'unsubscribed',
          updated_at: new Date().toISOString()
        })
        .eq('id', requests.newsletter_subscription_id)

      if (subscriptionError) throw subscriptionError

      return NextResponse.json(
        { 
          message: "Unsubscribe request approved and processed successfully",
          email: requests.newsletter_subscription.email
        },
        { status: 200 }
      )
    }

    // If rejected
    return NextResponse.json(
      { 
        message: "Unsubscribe request rejected",
        email: requests.newsletter_subscription.email
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error processing unsubscribe request:", error)
    return NextResponse.json(
      { error: "Failed to process unsubscribe request" },
      { status: 500 }
    )
  }
} 