import type { Metadata } from "next";

import { SEED_CATEGORIES } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Manage categories" };

/** Category management. Shows seed categories; CRUD wiring lands in Milestone 2. */
export default function AdminCategoriesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Categories</h1>
        <p className="text-muted-foreground mt-1">
          Aviation, listing, and request categories used across the platform.
        </p>
      </div>

      <Card className="border-border/60">
        <CardHeader>
          <CardTitle>Aviation categories (seed)</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="divide-y">
            {SEED_CATEGORIES.map((c) => (
              <li key={c.slug} className="flex items-center justify-between py-2 text-sm">
                <span className="font-medium">{c.name}</span>
                <Badge variant="secondary">{c.slug}</Badge>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground mt-4 text-xs">
            Editing categories will be enabled in Milestone 2; these are seeded via
            <code className="mx-1">supabase/seed.sql</code>.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
