import { createClient } from "@/lib/supabase/server";

interface GetCompaniesOptions {
  search?: string;
  page?: number;
  limit?: number;
}

export async function getCompanies({
  search,
  page = 1,
  limit = 12,
}: GetCompaniesOptions = {}) {
  const supabase = await createClient();

  let query = supabase
    .from("companies")
    .select(`
      id,
      name,
      slug,
      description,
      website,
      email,
      phone,
      country,
      service_type,
      is_verified,
      created_at
    `)
    .eq("is_active", true);

  // search next step

  query = query.order("created_at", {
    ascending: false,
  });

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  query = query.range(from, to);

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Failed to load companies.");
  }

  return data ?? [];
}

export async function getCompanyById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("companies")
    .select(`
      id,
      name,
      slug,
      description,
      website,
      email,
      phone,
      country,
      service_type,
      is_verified,
      created_at
    `)
    .eq("id", id)
    .single();

  if (error) return null;

  return data;
}

export async function getCompanyListings(companyId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("listings")
    .select(`
      id,
      title,
      slug,
      summary,
      price_amount,
      price_currency,
      location,
      categories (
        id,
        name,
        slug
      )
    `)
    .eq("company_id", companyId)
    .eq("status", "active")
    .order("published_at", {
      ascending: false,
      nullsFirst: false,
    });

  if (error) {
    console.error(error);
    throw new Error("Failed to load company listings.");
  }

  return data ?? [];
}