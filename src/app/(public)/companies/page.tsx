import type { Metadata } from "next";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = { title: "Company directory" };

/**
 * Company directory base.
 * Milestone 1: shell. Milestone 2 wires to the `companies` table.
 */
export default function CompaniesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Company Directory</h1>
      <p className="text-muted-foreground mt-1">
        Aviation companies and service providers on LFES Avia.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="border-border/60">
            <CardHeader>
              <CardTitle className="text-base">Sample company #{i + 1}</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
              Company records will be loaded from Supabase in Milestone 2.
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
