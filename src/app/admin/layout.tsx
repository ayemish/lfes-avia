import { requireRole } from "@/lib/auth";
import { ADMIN_NAV } from "@/lib/navigation";
import { DashboardShell } from "@/components/layout/dashboard-shell";

/**
 * Admin area. Restricted to admin + staff roles.
 * Middleware blocks non-staff; this re-checks server-side and loads the profile.
 */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const profile = await requireRole(["admin", "staff"]);

  return (
    <DashboardShell nav={ADMIN_NAV} profile={profile} areaLabel="Admin">
      {children}
    </DashboardShell>
  );
}
