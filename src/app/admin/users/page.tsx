import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = { title: "Manage users" };

export default function AdminUsersPage() {
  return (
    <PagePlaceholder title="Users" description="View users, roles, activity, and account status." />
  );
}
