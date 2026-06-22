import { requireProfile } from "@/lib/auth";
import { USER_NAV } from "@/lib/navigation";
import { DashboardShell } from "@/components/layout/dashboard-shell";

/** Authenticated user area. Middleware enforces auth; this also loads the profile. */
export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const profile = await requireProfile();

  return (
    <DashboardShell nav={USER_NAV} profile={profile} areaLabel="My Account">
      {children}
    </DashboardShell>
  );
}
