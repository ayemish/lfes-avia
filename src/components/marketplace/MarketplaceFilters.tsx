"use client";

import { useEffect, useState, useTransition } from "react";
import { Search } from "lucide-react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import { Input } from "@/components/ui/input";
import { useDebounce } from "@/lib/hooks/useDebounce";

export default function MarketplaceFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(
    searchParams.get("search") ?? ""
  );

  const debouncedSearch = useDebounce(search, 700);

  // URL change hone par input sync rahe
  useEffect(() => {
    setSearch(searchParams.get("search") ?? "");
  }, [searchParams]);

  // Debounced search
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedSearch.trim()) {
      params.set("search", debouncedSearch.trim());
    } else {
      params.delete("search");
    }

    params.delete("page");

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  }, [debouncedSearch]);

  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />

      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search listings..."
        className="pl-8"
      />
    </div>
  );
}