"use client";

import { useRouter, useSearchParams } from "next/navigation";
import GenderFilter from "./GenderFilter";
import BrandFilter from "./BrandFilter";
import PriceFilter from "./PriceFilter";
import CategorySidebar from "./CategorySidebar";

export default function SidebarFilter() {

  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = (key: string, values: string[]) => {

    const params = new URLSearchParams(searchParams.toString()); 

    params.delete(key);

    values.forEach(v => params.append(key, v));

    router.push(`?${params.toString()}`);
  };

  return (
    <div>
      <CategorySidebar/>
      <PriceFilter
        selected={searchParams.getAll("prices")}
        onChange={(v) => updateFilter("prices", v)}
      />

      <GenderFilter
        selected={searchParams.getAll("genders")}
        onChange={(v) => updateFilter("genders", v)}
      />

      <BrandFilter
        selected={searchParams.getAll("brandIds")}
        onChange={(v) => updateFilter("brandIds", v)}
      />

    </div>
  );
}