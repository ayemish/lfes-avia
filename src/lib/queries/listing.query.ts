import { createClient } from "@/lib/supabase/server";



export interface GetListingsOptions {
    category?: string;
    search?: string;
    page?: number;
    limit?: number;
}

export async function getListings({
    category,
    search,
    page = 1,
    limit = 12,
}: GetListingsOptions = {}) {
    const supabase = await createClient();

    let query = supabase
        .from("listings")
        .select(
            `
      id,
      title,
      slug,
      summary,
      description,
      kind,
      status,
      price_amount,
      price_currency,
      location,
      is_featured,
      published_at,
      created_at,
      categories (
        id,
        name,
        slug
      ),
      companies (
        id,
        name,
        slug
      )
    `
        )
        .eq("status", "active");

    if (search?.trim()) {
        query = query.ilike("title", `%${search.trim()}%`);
    }
    if (category) {
        const { data: categoryRow } = await supabase
            .from("categories")
            .select("id")
            .eq("slug", category)
            .single();

        if (!categoryRow) {
            return [];
        }

        query = query.eq("category_id", categoryRow.id);
    }

    query = query
        .order("is_featured", { ascending: false })
        .order("published_at", {
            ascending: false,
            nullsFirst: false,
        })
        .order("created_at", { ascending: false });

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    query = query.range(from, to);

    const { data, error } = await query;

    if (error) {
        console.error("Error fetching listings:", error);
        throw new Error("Failed to load listings.");
    }

    return data ?? [];
}

// ++++++++++++++++++++++++GET LISTS BY ID+++++++++++++++++++++++++++++++++++++++++

export async function getListingById(id: string) {
    
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("listings")
        .select(`
      id,
      title,
      slug,
      summary,
      description,
      kind,
      status,
      location,
      price_amount,
      price_currency,
      is_featured,
      published_at,
      created_at,
      categories (
        id,
        name,
        slug
      ),
      companies (
        id,
        name,
        slug,
        website,
        country
      )
    `)
        .eq("id", id)
        .single();

    if (error) {
        return null;
    }

    return data;
}