import type { Metadata } from "next";
import { Search } from "lucide-react";

import { SEED_CATEGORIES } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { getListings } from "@/lib/queries/listing.query";
import SearchBar from "@/components/marketplace/MarketplaceFilters";

export const metadata: Metadata = { title: "Browse listings & deals" };

/**
 * Browse listings / deals.
 * Milestone 1: static shell + filters UI. Milestone 2 wires this to the
 * `listings` table (search, category filter, status) via Supabase.
 */
interface ListingsPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
  }>;
}


export default async function ListingsPage({
  searchParams,
}: ListingsPageProps) {
  const params = await searchParams;
  const listings = await getListings({
    search: params.search,
    category: params.category,
  });
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Listings & Deals</h1>
        <p className="text-muted-foreground">Browse aviation listings and commercial deals.</p>
      </div>

      <div className="mt-6 flex flex-col gap-4 md:flex-row">
        {/* Filters */}
        <aside className="md:w-56 md:shrink-0">
          {/* <form>
            <div className="relative">
              <Search className="text-muted-foreground absolute top-2.5 left-2.5 size-4" />

              <Input
                name="search"
                defaultValue={params.search}
                placeholder="Search..."
                className="pl-8"
              />
            </div>
          </form> */}
          <SearchBar />
          <div className="mt-4">
            <p className="mb-2 text-sm font-medium">Categories</p>
            <ul className="space-y-1 text-sm">
              {SEED_CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/listings?category=${c.slug}`}
                    className={`block rounded px-2 py-1 transition hover:bg-muted ${params.category === c.slug
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground"
                      }`}
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Results grid (placeholder) */}
        <div className="grid flex-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="border-border/60">
              <CardHeader>
                <Badge variant="secondary" className="w-fit">
                  Sample category
                </Badge>
                <CardTitle className="mt-2 text-base">Sample listing #{i + 1}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm">
                Listing data will be loaded from Supabase in Milestone 2.
              </CardContent>
            </Card>
          ))} */}
          {listings.length === 0 ? (
            <Card className="col-span-full">
              <CardContent className="py-10 text-center">
                <h3 className="text-lg font-semibold">
                  No Listings Found
                </h3>

                <p className="text-muted-foreground mt-2">
                  Listings will appear here once they are published.
                </p>
              </CardContent>
            </Card>
          ) : (
            listings.map((listing: any) => (
              <Card key={listing.id} className="border-border/60">
                <CardHeader>
                  <Badge variant="secondary" className="w-fit">
                    {listing.categories?.name ?? "Uncategorized"}
                  </Badge>

                  <CardTitle className="mt-2 text-base">
                    {listing.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-3">
                  <p className="text-muted-foreground text-sm">
                    {listing.summary ?? "No description available."}
                  </p>

                  <div className="space-y-1 text-sm">
                    {listing.companies?.name && (
                      <p>
                        <span className="font-medium">Company:</span>{" "}
                        {listing.companies.name}
                      </p>
                    )}

                    {listing.location && (
                      <p>
                        <span className="font-medium">Location:</span>{" "}
                        {listing.location}
                      </p>
                    )}

                    {listing.price_amount && (
                      <p>
                        <span className="font-medium">Price:</span>{" "}
                        {listing.price_currency} {listing.price_amount}
                      </p>
                    )}
                  </div>

                  <Link
                    href={`/listings/${listing.id}`}
                    className="text-primary inline-block text-sm font-medium hover:underline"
                  >
                    View Details →
                  </Link>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
