import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/**
 * Listing / deal detail page.
 * Milestone 1: structural shell. Milestone 2 fetches the listing by id and
 * wires the inquiry / concierge CTAs.
 */
export default async function ListingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10">
      <Link href="/listings" className="text-muted-foreground text-sm hover:underline">
        ← Back to listings
      </Link>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <Badge variant="secondary">Sample category</Badge>
          <h1 className="mt-2 text-2xl font-semibold">Listing {id}</h1>
          <p className="text-muted-foreground mt-1">Status: active</p>
        </div>
        <Button asChild>
          <Link href="/requests/new">Express interest</Link>
        </Button>
      </div>

      <Card className="border-border/60 mt-6">
        <CardHeader>
          <CardTitle>Details</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground text-sm">
          Full listing details (description, key fields, company connection) will be loaded from the{" "}
          <code>listings</code> table in Milestone 2.
        </CardContent>
      </Card>
    </div>
  );
}
