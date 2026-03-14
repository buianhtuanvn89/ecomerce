"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function SortDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }

    params.set("page", "0"); // reset về trang đầu

    router.push(`?${params.toString()}`);
  };

  return (
    <select onChange={handleSortChange} defaultValue={searchParams.get("sort") || ""}>
      <option value="">Default</option>
      <option value="price,asc">Price: Low → High</option>
      <option value="price,desc">Price: High → Low</option>
      <option value="createdAt,desc">Newest</option>
      <option value="productName,asc">Name A → Z</option>
    </select>
  );
}