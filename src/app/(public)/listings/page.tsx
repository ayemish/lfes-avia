import type { Metadata } from "next";
import { Search } from "lucide-react";

import { SEED_CATEGORIES } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Browse listings & deals" };

/**
 * Browse listings / deals.
 * Milestone 1: static shell + filters UI. Milestone 2 wires this to the
 * `listings` table (search, category filter, status) via Supabase.
 */
export default function ListingsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Listings & Deals</h1>
        <p className="text-muted-foreground">Browse aviation listings and commercial deals.</p>
      </div>

      <div className="mt-6 flex flex-col gap-4 md:flex-row">
        {/* Filters */}
        <aside className="md:w-56 md:shrink-0">
          <div className="relative">
            <Search className="text-muted-foreground absolute top-2.5 left-2.5 size-4" />
            <Input placeholder="Search…" className="pl-8" />
          </div>
          <div className="mt-4">
            <p className="mb-2 text-sm font-medium">Categories</p>
            <ul className="space-y-1 text-sm">
              {SEED_CATEGORIES.map((c) => (
                <li key={c.slug} className="text-muted-foreground hover:text-foreground">
                  {c.name}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Results grid (placeholder) */}
        <div className="grid flex-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
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
          ))}
        </div>
      </div>
    </div>
  );
}
