import Link from "next/link";
import { Plane } from "lucide-react";

import { SITE } from "@/lib/constants";

/** Centered layout for auth screens. */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-12">
      <Link href="/" className="mb-6 flex items-center gap-2 text-lg font-semibold">
        <span className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
          <Plane className="size-4" />
        </span>
        {SITE.name}
      </Link>
      <div className="w-full max-w-sm">{children}</div>
    </main>
  );
}
