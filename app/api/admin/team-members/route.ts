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

export async function GET() {
  const { error, supabase } = await requireSuperAdmin();
  if (error) return error;

  const { data, error: fetchError } = await supabase!
    .from("team_members")
    .select("*")
    .order("category", { ascending: true })
    .order("sort_order", { ascending: true });

  if (fetchError) return NextResponse.json({ error: fetchError.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function POST(request: Request) {
  const { error, supabase } = await requireSuperAdmin();
  if (error) return error;

  const body = await request.json().catch(() => ({}));
  const { name, role, company = "Legend Holding Group", image, category = "board" } = body;

  if (!name || !role || !image) {
    return NextResponse.json(
      { error: "name, role, and image are required" },
      { status: 400 }
    );
  }

  if (!["board", "ksa", "china"].includes(category)) {
    return NextResponse.json({ error: "category must be board, ksa, or china" }, { status: 400 });
  }

  const { data: maxOrder } = await supabase!
    .from("team_members")
    .select("sort_order")
    .eq("category", category)
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  const sort_order = ((maxOrder as { sort_order: number } | null)?.sort_order ?? 0) + 1;

  const { data: inserted, error: insertError } = await supabase!
    .from("team_members")
    .insert({
      name: String(name).trim(),
      role: String(role).trim(),
      company: String(company).trim(),
      image: String(image).trim(),
      category: String(category).trim(),
      sort_order,
      is_visible: true,
    })
    .select()
    .single();

  if (insertError) return NextResponse.json({ error: insertError.message }, { status: 500 });
  return NextResponse.json(inserted);
}
