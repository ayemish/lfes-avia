"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function createRequest(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("requests")
    .insert({
      user_id: user?.id ?? null,
      type: formData.get("type"),
      category_id: formData.get("category"),
      title: formData.get("title"),
      description: formData.get("description"),
      urgency: formData.get("urgency"),
      budget: formData.get("budget"),
      contact_pref: formData.get("contact_pref"),
    })
    .select()
    .single();

  console.log("USER:", user);
  console.log("DATA:", data);
  console.log("ERROR:", error);

  if (error) {
    console.error(error);
    throw new Error("Failed to create request.");
  }

  redirect("/requests");
}