import Link from "next/link";
import { Plane } from "lucide-react";

import { SITE } from "@/lib/constants";
import { PUBLIC_NAV } from "@/lib/navigation";
import { Button } from "@/components/ui/button";

/** Public site header with primary navigation and auth entry points. */
export function SiteHeader() {
  return (
    <header className="border-border/60 bg-background/80 sticky top-0 z-40 w-full border-b backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
            <Plane className="size-4" />
          </span>
          <span>{SITE.name}</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          {PUBLIC_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">Log in</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/signup">Sign up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
