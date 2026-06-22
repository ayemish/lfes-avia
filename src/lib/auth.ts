import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/types/database";
import type { UserRole } from "@/lib/constants";

/**
 * Server-side auth helpers. Use inside Server Components / Server Actions.
 * Route-level protection is also enforced in middleware; these helpers give
 * components the authenticated profile and fine-grained guards.
 */

/** Returns the authenticated profile, or null if not signed in. */
export async function getCurrentProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();

  return (profile as Profile) ?? null;
}

/** Like getCurrentProfile but redirects to /login when unauthenticated. */
export async function requireProfile(redirectTo = "/login"): Promise<Profile> {
  const profile = await getCurrentProfile();
  if (!profile) redirect(redirectTo);
  return profile;
}

/** Requires the user to hold one of the given roles, else redirects. */
export async function requireRole(roles: UserRole[], fallback = "/dashboard"): Promise<Profile> {
  const profile = await requireProfile();
  if (!roles.includes(profile.role)) redirect(fallback);
  return profile;
}

export const isStaff = (p: Profile | null) => !!p && (p.role === "admin" || p.role === "staff");
export const isAdmin = (p: Profile | null) => !!p && p.role === "admin";
