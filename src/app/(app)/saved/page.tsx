import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = { title: "Saved items" };

export default function SavedPage() {
  return (
    <PagePlaceholder
      title="Saved Items"
      description="Listings and deals you've saved or shown interest in."
    />
  );
}
