import Link from "next/link";
import type { Metadata } from "next";

import { REQUEST_TYPES, SEED_CATEGORIES, URGENCY_LEVELS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const metadata: Metadata = { title: "New request" };

/**
 * Structured request form (UI shell).
 * Milestone 2 wires submission to the `requests` table via a Server Action;
 * Milestone 3 adds AI-guided assistance. The field set mirrors the schema.
 */
export default function NewRequestPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <Link href="/requests" className="text-muted-foreground text-sm hover:underline">
          ← Back to requests
        </Link>
        <h1 className="mt-2 text-2xl font-semibold">Submit a request</h1>
        <p className="text-muted-foreground mt-1">
          Tell us what you need. The concierge team reviews every request.
        </p>
      </div>

      <Card className="border-border/60">
        <CardHeader>
          <CardTitle>Request details</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Submission handler added in Milestone 2. */}
          <form className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="type">Request type</Label>
                <select
                  id="type"
                  name="type"
                  className="border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm capitalize"
                  defaultValue="deal"
                >
                  {REQUEST_TYPES.map((t) => (
                    <option key={t} value={t} className="capitalize">
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  name="category"
                  className="border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm"
                >
                  {SEED_CATEGORIES.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" placeholder="e.g. Looking for a mid-size jet" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                name="description"
                required
                rows={5}
                placeholder="Describe what you're looking for in as much detail as possible."
                className="border-input w-full rounded-md border bg-transparent p-3 text-sm"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="urgency">Urgency</Label>
                <select
                  id="urgency"
                  name="urgency"
                  className="border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm capitalize"
                  defaultValue="medium"
                >
                  {URGENCY_LEVELS.map((u) => (
                    <option key={u} value={u} className="capitalize">
                      {u}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget">Budget / commercial interest</Label>
                <Input id="budget" name="budget" placeholder="Optional" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact_pref">Preferred contact method</Label>
              <Input id="contact_pref" name="contact_pref" placeholder="Email, phone, Telegram…" />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" type="button" asChild>
                <Link href="/requests">Cancel</Link>
              </Button>
              <Button type="submit" disabled>
                Submit request (wired in M2)
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
