import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

// PATCH /api/admin/newsletters/[id]
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await req.json()
    const { id } = params

    const { data, error } = await supabase
      .from('newsletter_subscriptions')
      .update({ 
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    if (!data) {
      return NextResponse.json(
        { error: "Newsletter subscription not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error updating newsletter subscription:", error)
    return NextResponse.json(
      { error: "Failed to update newsletter subscription" },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/newsletters/[id]
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    const { data, error } = await supabase
      .from('newsletter_subscriptions')
      .delete()
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    if (!data) {
      return NextResponse.json(
        { error: "Newsletter subscription not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: "Newsletter subscription deleted successfully" })
  } catch (error) {
    console.error("Error deleting newsletter subscription:", error)
    return NextResponse.json(
      { error: "Failed to delete newsletter subscription" },
      { status: 500 }
    )
  }
} 