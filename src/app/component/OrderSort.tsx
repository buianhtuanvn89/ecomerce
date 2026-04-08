"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function OrderSort() {
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
      <option value="totalPrice,asc">totalPrice A → Z</option>
      <option value="totalPrice,desc">totalPrice Z → A</option>
      <option value="createdAt,asc">createdAt A → Z</option>
      <option value="createdAt,desc">createdAt Z → A</option>
    </select>
  );
}