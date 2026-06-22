import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = { title: "Messages" };

export default function MessagesPage() {
  return (
    <PagePlaceholder
      title="Messages"
      description="Conversations with the LFES Avia team about your requests and listings."
    />
  );
}
