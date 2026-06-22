import Link from "next/link";

import { SITE } from "@/lib/constants";

/** Public site footer. */
export function SiteFooter() {
  return (
    <footer className="border-border/60 mt-auto border-t">
      <div className="text-muted-foreground mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm sm:flex-row">
        <p>
          © {new Date().getFullYear()} {SITE.name}. {SITE.tagline}.
        </p>
        <nav className="flex items-center gap-6">
          <Link href="/listings" className="hover:text-foreground transition-colors">
            Listings
          </Link>
          <Link href="/companies" className="hover:text-foreground transition-colors">
            Companies
          </Link>
          <Link href="/signup" className="hover:text-foreground transition-colors">
            Get started
          </Link>
        </nav>
      </div>
    </footer>
  );
}
