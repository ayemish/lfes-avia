/**
 * Hand-authored database row types mirroring supabase/migrations.
 *
 * Once a live Supabase project exists, regenerate the canonical types with:
 *   npx supabase gen types typescript --project-id <ref> > src/types/supabase.ts
 * and switch imports to that file. Until then, these keep the app type-safe.
 */
import type {
  ListingKind,
  ListingStatus,
  RequestStatus,
  RequestType,
  SourceChannel,
  UrgencyLevel,
  UserRole,
} from "@/lib/constants";

export type CategoryKind = "aviation" | "listing" | "request";

export interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  role: UserRole;
  company_id: string | null;
  phone: string | null;
  telegram_id: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Company {
  id: string;
  name: string;
  slug: string | null;
  description: string | null;
  website: string | null;
  email: string | null;
  phone: string | null;
  country: string | null;
  service_type: string | null;
  is_verified: boolean;
  is_active: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  kind: CategoryKind;
  parent_id: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Listing {
  id: string;
  kind: ListingKind;
  title: string;
  slug: string | null;
  summary: string | null;
  description: string | null;
  category_id: string | null;
  company_id: string | null;
  status: ListingStatus;
  price_amount: number | null;
  price_currency: string | null;
  location: string | null;
  attributes: Record<string, unknown>;
  is_featured: boolean;
  created_by: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Request {
  id: string;
  user_id: string | null;
  type: RequestType;
  status: RequestStatus;
  category_id: string | null;
  listing_id: string | null;
  title: string | null;
  description: string;
  urgency: UrgencyLevel;
  budget: string | null;
  contact_pref: string | null;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  source: SourceChannel;
  ai_summary: string | null;
  assigned_to: string | null;
  created_at: string;
  updated_at: string;
}

export interface SavedItem {
  id: string;
  user_id: string;
  listing_id: string;
  created_at: string;
}

export interface Conversation {
  id: string;
  subject: string | null;
  user_id: string | null;
  listing_id: string | null;
  request_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string | null;
  is_admin: boolean;
  body: string;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string | null;
  title: string;
  body: string | null;
  type: string | null;
  link: string | null;
  channel: SourceChannel;
  is_read: boolean;
  created_at: string;
}

export interface AiLog {
  id: string;
  user_id: string | null;
  request_id: string | null;
  kind: string | null;
  prompt: string | null;
  response: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface BotInteraction {
  id: string;
  telegram_id: string | null;
  user_id: string | null;
  request_id: string | null;
  direction: string | null;
  payload: Record<string, unknown>;
  created_at: string;
}

export interface AdminNote {
  id: string;
  author_id: string | null;
  entity_type: string;
  entity_id: string;
  body: string;
  created_at: string;
}

export interface ActivityLog {
  id: string;
  actor_id: string | null;
  action: string;
  entity_type: string | null;
  entity_id: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
}
