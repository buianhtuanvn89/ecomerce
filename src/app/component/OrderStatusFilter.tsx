"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function OrderStatusFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) params.set("status", value);
    else params.delete("status");

    params.set("page", "0");

    router.push(`?${params.toString()}`);
  };

  return (
    <select
      value={searchParams.get("status") || ""}
      onChange={(e) => handleChange(e.target.value)}
    >
        <option value="">All</option>
        <option value="PENDING">PENDING</option>
        <option value="CONFIRMED">CONFIRMED</option>
        <option value="SHIPPING">SHIPPING</option>
        <option value="DELIVERED">DELIVERED</option>
        <option value="CANCELLED">CANCELLED</option>
    </select>
  );
}