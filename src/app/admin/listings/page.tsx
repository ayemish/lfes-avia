import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = { title: "Manage listings & deals" };

export default function AdminListingsPage() {
  return (
    <PagePlaceholder
      title="Listings & Deals"
      description="Create, edit, archive listings/deals, assign categories, and manage status."
    />
  );
}
