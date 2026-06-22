import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/** Company profile page (shell — wired to `companies` in Milestone 2). */
export default async function CompanyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10">
      <Link href="/companies" className="text-muted-foreground text-sm hover:underline">
        ← Back to directory
      </Link>
      <h1 className="mt-4 text-2xl font-semibold">Company {id}</h1>
      <Card className="border-border/60 mt-6">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground text-sm">
          Company profile details will be loaded from the <code>companies</code> table in Milestone
          2.
        </CardContent>
      </Card>
    </div>
  );
}
