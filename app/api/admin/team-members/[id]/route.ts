import { createClient } from "@supabase/supabase-js";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

async function requireSuperAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return { error: NextResponse.json({ error: "Server config error" }, { status: 500 }), supabase: null };
  }
  const cookieStore = await cookies();
  const supabaseAuth = createRouteHandlerClient({ cookies: () => cookieStore });
  const { data: { session } } = await supabaseAuth.auth.getSession();
  if (!session?.user) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }), supabase: null };
  }
  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { data: roleData, error: roleError } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", session.user.id)
    .single();
  if (roleError || !roleData || (roleData as { role: string }).role !== "super_admin") {
    return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }), supabase: null };
  }
  return { error: null, supabase };
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { error, supabase } = await requireSuperAdmin();
  if (error) return error;

  const body = await request.json().catch(() => ({}));
  const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };

  if (body.name !== undefined) updates.name = String(body.name).trim();
  if (body.role !== undefined) updates.role = String(body.role).trim();
  if (body.company !== undefined) updates.company = String(body.company).trim();
  if (body.image !== undefined) updates.image = String(body.image).trim();
  if (body.category !== undefined) {
    if (!["board", "ksa", "china"].includes(body.category)) {
      return NextResponse.json({ error: "category must be board, ksa, or china" }, { status: 400 });
    }
    updates.category = String(body.category).trim();
  }
  if (body.sort_order !== undefined) updates.sort_order = Number(body.sort_order);
  if (body.is_visible !== undefined) updates.is_visible = Boolean(body.is_visible);
  if (body.is_spotlight !== undefined) updates.is_spotlight = Boolean(body.is_spotlight);
  if (body.seo_description !== undefined) updates.seo_description = String(body.seo_description).trim();
  if (body.linkedin !== undefined) updates.linkedin = String(body.linkedin).trim();

  const { data, error: updateError } = await supabase!
    .from("team_members")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (updateError) return NextResponse.json({ error: updateError.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { error, supabase } = await requireSuperAdmin();
  if (error) return error;

  const { error: deleteError } = await supabase!.from("team_members").delete().eq("id", id);
  if (deleteError) return NextResponse.json({ error: deleteError.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
