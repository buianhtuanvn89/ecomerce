"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function UserSort() {
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
      <option value="id,asc">ID A → Z</option>
      <option value="id,desc">ID Z → A</option>
      <option value="userName,asc">Name A → Z</option>
      <option value="userName,desc">Name Z → A</option>
    </select>
  );
}