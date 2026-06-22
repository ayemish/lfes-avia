/** Centralized navigation definitions used by headers and sidebars. */

export interface NavItem {
  label: string;
  href: string;
}

/** Public top-nav (marketing + marketplace). */
export const PUBLIC_NAV: NavItem[] = [
  { label: "Listings", href: "/listings" },
  { label: "Deals", href: "/listings?kind=deal" },
  { label: "Companies", href: "/companies" },
  { label: "How it works", href: "/#how-it-works" },
];

/** Authenticated user dashboard sidebar. */
export const USER_NAV: NavItem[] = [
  { label: "Overview", href: "/dashboard" },
  { label: "My Requests", href: "/requests" },
  { label: "Saved Items", href: "/saved" },
  { label: "Messages", href: "/messages" },
  { label: "Profile", href: "/profile" },
];

/** Admin sidebar (admin + staff). */
export const ADMIN_NAV: NavItem[] = [
  { label: "Dashboard", href: "/admin" },
  { label: "Requests", href: "/admin/requests" },
  { label: "Listings & Deals", href: "/admin/listings" },
  { label: "Companies", href: "/admin/companies" },
  { label: "Users", href: "/admin/users" },
  { label: "Categories", href: "/admin/categories" },
];
