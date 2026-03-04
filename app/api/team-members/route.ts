import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

  const { data, error } = await supabase
    .from("team_members")
    .select("name, role, company, image, category, sort_order")
    .eq("is_visible", true)
    .order("sort_order", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const board = (data ?? []).filter((m) => m.category === "board");
  const ksa = (data ?? []).filter((m) => m.category === "ksa");
  const china = (data ?? []).filter((m) => m.category === "china");

  return NextResponse.json({ board, ksa, china });
}
