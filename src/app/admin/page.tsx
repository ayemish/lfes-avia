import type { Metadata } from "next";
import { Building2, FileText, LayoutList, Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = { title: "Admin dashboard" };

/** Admin dashboard overview. Metrics wired to the DB in Milestone 2. */
export default function AdminDashboardPage() {
  const stats = [
    { label: "New requests", value: 0, icon: FileText },
    { label: "Users", value: 0, icon: Users },
    { label: "Listings & deals", value: 0, icon: LayoutList },
    { label: "Companies", value: 0, icon: Building2 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview of platform activity.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <Card key={label} className="border-border/60">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="text-3xl">{value}</CardTitle>
              <Icon className="text-muted-foreground size-5" />
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">{label}</CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border/60 border-dashed">
        <CardContent className="text-muted-foreground py-10 text-center text-sm">
          Recent activity and analytics will be populated from the database in Milestone 2.
        </CardContent>
      </Card>
    </div>
  );
}
