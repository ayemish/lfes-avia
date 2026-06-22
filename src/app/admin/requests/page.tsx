import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = { title: "Manage requests" };

export default function AdminRequestsPage() {
  return (
    <PagePlaceholder
      title="Requests"
      description="View, filter, assign status, and follow up on user requests (CRM)."
    />
  );
}
