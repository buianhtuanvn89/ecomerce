"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function OrderSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) params.set("query", value);
    else params.delete("query");

    params.set("page", "0");

    router.push(`?${params.toString()}`);
  };

  return (
    <input
      placeholder="Search by username..."
      defaultValue={searchParams.get("search") || ""}
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
}