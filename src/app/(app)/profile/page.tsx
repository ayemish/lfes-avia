import type { Metadata } from "next";

import { getCurrentProfile } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Profile" };

/** Profile / account settings. Reads live profile; editing lands in Milestone 2. */
export default async function ProfilePage() {
  const profile = await getCurrentProfile();

  const fields: { label: string; value: string }[] = [
    { label: "Full name", value: profile?.full_name ?? "—" },
    { label: "Email", value: profile?.email ?? "—" },
    { label: "Phone", value: profile?.phone ?? "—" },
  ];

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your account details.</p>
      </div>

      <Card className="border-border/60">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Account</CardTitle>
          {profile && (
            <Badge variant="secondary" className="capitalize">
              {profile.role}
            </Badge>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {fields.map((f) => (
            <div key={f.label} className="flex justify-between border-b pb-2 text-sm last:border-0">
              <span className="text-muted-foreground">{f.label}</span>
              <span className="font-medium">{f.value}</span>
            </div>
          ))}
          <p className="text-muted-foreground text-xs">
            Profile editing will be enabled in Milestone 2.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
