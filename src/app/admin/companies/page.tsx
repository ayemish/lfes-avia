import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = { title: "Manage companies" };

export default function AdminCompaniesPage() {
  return (
    <PagePlaceholder
      title="Companies"
      description="Manage company directory records and verification status."
    />
  );
}
