import { createClient } from "@/lib/supabase/server";

export async function getRequestCategories() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug")
    .eq("kind", "request")
    .eq("is_active", true)
    .order("sort_order");

  if (error) {
    console.error(error);
    throw new Error("Failed to load request categories.");
  }

  return data ?? [];
}