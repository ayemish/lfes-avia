/**
 * Central, framework-agnostic constants for LFES Avia Phase 1.
 * Keep enums here in sync with the database enums in supabase/migrations.
 */

export const SITE = {
  name: "LFES Avia",
  tagline: "The Aviation Marketplace & Concierge",
  description:
    "Discover aviation deals, listings, and companies. Submit structured requests and let the LFES Avia concierge help you move faster.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

/** Application user roles. Mirrors the `user_role` enum in the database. */
export const USER_ROLES = ["admin", "staff", "user"] as const;
export type UserRole = (typeof USER_ROLES)[number];

/** Request types a user can submit. Mirrors `request_type` enum. */
export const REQUEST_TYPES = ["deal", "document", "concierge"] as const;
export type RequestType = (typeof REQUEST_TYPES)[number];

/** CRM-style lifecycle status for a request. Mirrors `request_status` enum. */
export const REQUEST_STATUSES = [
  "new",
  "reviewing",
  "contacted",
  "in_progress",
  "waiting_user",
  "closed",
] as const;
export type RequestStatus = (typeof REQUEST_STATUSES)[number];

export const REQUEST_STATUS_LABELS: Record<RequestStatus, string> = {
  new: "New",
  reviewing: "Reviewing",
  contacted: "Contacted",
  in_progress: "In progress",
  waiting_user: "Waiting for user",
  closed: "Closed",
};

/** Urgency levels for a request. Mirrors `urgency_level` enum. */
export const URGENCY_LEVELS = ["low", "medium", "high", "urgent"] as const;
export type UrgencyLevel = (typeof URGENCY_LEVELS)[number];

/** Listing / deal publication status. Mirrors `listing_status` enum. */
export const LISTING_STATUSES = ["draft", "active", "reserved", "closed", "archived"] as const;
export type ListingStatus = (typeof LISTING_STATUSES)[number];

/** Listing kind — a general listing or a commercial deal. Mirrors `listing_kind` enum. */
export const LISTING_KINDS = ["listing", "deal"] as const;
export type ListingKind = (typeof LISTING_KINDS)[number];

/** Source channel an entity was created from. Mirrors `source_channel` enum. */
export const SOURCE_CHANNELS = ["web", "bot", "admin", "ai"] as const;
export type SourceChannel = (typeof SOURCE_CHANNELS)[number];

/**
 * Seed aviation categories for Phase 1. The DB `categories` table is the source
 * of truth at runtime; this list is used to seed it and as a typed fallback.
 */
export const SEED_CATEGORIES = [
  { slug: "aircraft", name: "Aircraft" },
  { slug: "helicopters", name: "Helicopters" },
  { slug: "engines", name: "Engines" },
  { slug: "components", name: "Components & Parts" },
  { slug: "services", name: "MRO & Services" },
  { slug: "documents", name: "Documents & Records" },
  { slug: "inspections", name: "Inspections" },
  { slug: "leasing", name: "Leasing & ACMI" },
] as const;
