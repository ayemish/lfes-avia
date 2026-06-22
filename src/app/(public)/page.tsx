import Link from "next/link";
import { ArrowRight, FileText, MessageSquare, Plane, Search, ShieldCheck } from "lucide-react";

import { SITE, SEED_CATEGORIES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/** Landing page — introduces LFES Avia and converts visitors into users. */
export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="mx-auto w-full max-w-6xl px-4 py-20 text-center">
        <Badge variant="secondary" className="mb-4">
          Phase 1 · Now in early access
        </Badge>
        <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
          The aviation marketplace and concierge built for serious operators
        </h1>
        <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg">{SITE.description}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" asChild>
            <Link href="/signup">
              Get started <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/listings">Browse listings</Link>
          </Button>
        </div>
      </section>

      {/* Value props */}
      <section className="bg-muted/40 border-y py-16">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:grid-cols-3">
          {[
            {
              icon: Search,
              title: "Discover opportunities",
              body: "Browse curated aviation listings, deals, and verified companies in one place.",
            },
            {
              icon: MessageSquare,
              title: "AI Concierge",
              body: "Describe what you need and let the concierge guide you to the right request.",
            },
            {
              icon: ShieldCheck,
              title: "Managed follow-up",
              body: "Every request is tracked and handled by the LFES Avia team — nothing slips.",
            },
          ].map(({ icon: Icon, title, body }) => (
            <Card key={title} className="border-border/60">
              <CardHeader>
                <span className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-lg">
                  <Icon className="size-5" />
                </span>
                <CardTitle className="mt-2">{title}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm">{body}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto w-full max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-semibold">Marketplace categories</h2>
        <p className="text-muted-foreground mt-1">
          From aircraft and engines to leasing, services, and documents.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {SEED_CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/listings?category=${c.slug}`}
              className="border-border/60 hover:border-primary/50 hover:bg-accent flex items-center gap-2 rounded-lg border p-4 text-sm font-medium transition-colors"
            >
              <Plane className="text-muted-foreground size-4" />
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-muted/40 border-t py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-semibold">How LFES Avia works</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            {[
              {
                step: "1",
                title: "Browse or submit a request",
                body: "Explore listings and deals, or submit a structured deal, document, or concierge request.",
              },
              {
                step: "2",
                title: "We qualify & match",
                body: "The AI Concierge structures your request and our team reviews and follows up.",
              },
              {
                step: "3",
                title: "Stay updated",
                body: "Track status in your dashboard and receive updates on the platform and via Telegram.",
              },
            ].map((s) => (
              <div key={s.step}>
                <span className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-full text-sm font-semibold">
                  {s.step}
                </span>
                <h3 className="mt-3 font-medium">{s.title}</h3>
                <p className="text-muted-foreground mt-1 text-sm">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto w-full max-w-6xl px-4 py-20 text-center">
        <FileText className="text-primary mx-auto size-8" />
        <h2 className="mt-4 text-2xl font-semibold">Have a specific need?</h2>
        <p className="text-muted-foreground mx-auto mt-2 max-w-xl">
          Submit a request and the concierge team will help you move forward.
        </p>
        <Button size="lg" className="mt-6" asChild>
          <Link href="/signup">Create your account</Link>
        </Button>
      </section>
    </div>
  );
}
