import Link from "next/link";
import { Plane } from "lucide-react";

import { SITE } from "@/lib/constants";
import type { NavItem } from "@/lib/navigation";
import type { Profile } from "@/types/database";
import { DashboardNav } from "@/components/layout/dashboard-nav";
import { SignOutButton } from "@/components/layout/sign-out-button";

/** Shared sidebar shell for the user dashboard and admin area. */
export function DashboardShell({
  nav,
  profile,
  areaLabel,
  children,
}: {
  nav: NavItem[];
  profile: Profile;
  areaLabel: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1">
      <aside className="bg-sidebar text-sidebar-foreground hidden w-60 shrink-0 flex-col border-r md:flex">
        <div className="flex h-16 items-center gap-2 border-b px-4 font-semibold">
          <Link href="/" className="flex items-center gap-2">
            <span className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
              <Plane className="size-4" />
            </span>
            {SITE.name}
          </Link>
        </div>
        <div className="text-muted-foreground px-4 pt-4 text-xs font-medium tracking-wide uppercase">
          {areaLabel}
        </div>
        <div className="flex-1 p-3">
          <DashboardNav items={nav} />
        </div>
        <div className="border-t p-3">
          <p className="truncate px-3 text-sm font-medium">{profile.full_name ?? "Account"}</p>
          <p className="text-muted-foreground truncate px-3 text-xs">{profile.email}</p>
          <div className="mt-2">
            <SignOutButton />
          </div>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        {/* Mobile top bar */}
        <div className="flex h-14 items-center justify-between border-b px-4 md:hidden">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Plane className="text-primary size-5" /> {SITE.name}
          </Link>
          <SignOutButton />
        </div>
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
