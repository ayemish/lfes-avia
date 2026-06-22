import Link from "next/link";
import type { Metadata } from "next";
import { Bookmark, FileText, MessageSquare, Plus } from "lucide-react";

import { getCurrentProfile } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = { title: "Dashboard" };

/** User dashboard overview. Metric wiring lands in Milestone 2. */
export default async function DashboardPage() {
  const profile = await getCurrentProfile();
  const firstName = profile?.full_name?.split(" ")[0];

  const stats = [
    { label: "Submitted requests", value: 0, icon: FileText, href: "/requests" },
    { label: "Saved items", value: 0, icon: Bookmark, href: "/saved" },
    { label: "Messages", value: 0, icon: MessageSquare, href: "/messages" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Welcome{firstName ? `, ${firstName}` : ""}</h1>
          <p className="text-muted-foreground">Here&apos;s an overview of your activity.</p>
        </div>
        <Button asChild>
          <Link href="/requests/new">
            <Plus className="size-4" /> New request
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map(({ label, value, icon: Icon, href }) => (
          <Link key={label} href={href}>
            <Card className="border-border/60 hover:border-primary/50 transition-colors">
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle className="text-3xl">{value}</CardTitle>
                <Icon className="text-muted-foreground size-5" />
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm">{label}</CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Card className="border-border/60">
        <CardHeader>
          <CardTitle>AI Concierge</CardTitle>
          <CardDescription>
            Describe what you need and get guided to the right request. Available in Milestone 3.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" disabled>
            Open Concierge (coming soon)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
