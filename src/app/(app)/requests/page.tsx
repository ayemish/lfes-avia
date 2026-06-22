import Link from "next/link";
import type { Metadata } from "next";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = { title: "My Requests" };

export default function RequestsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">My Requests</h1>
          <p className="text-muted-foreground mt-1">Track the requests you&apos;ve submitted.</p>
        </div>
        <Button asChild>
          <Link href="/requests/new">
            <Plus className="size-4" /> New request
          </Link>
        </Button>
      </div>
      <Card className="border-border/60 border-dashed">
        <CardContent className="text-muted-foreground py-10 text-center text-sm">
          Your submitted requests will appear here once the request flow is wired in Milestone 2.
        </CardContent>
      </Card>
    </div>
  );
}
