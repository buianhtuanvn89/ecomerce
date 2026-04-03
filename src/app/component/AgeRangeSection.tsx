"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const ageCategories = [
   {
    label: "0 - 1",
    value: "0-1",
    image:
      "https://images.unsplash.com/photo-1604881991720-f91add269bed?q=80&w=800&auto=format&fit=crop",
  },
  {
    label: "1 - 3",
    value: "1-3",
    image:
      "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop",
  },
  {
    label: "3 - 6",
    value: "3-6",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=800&auto=format&fit=crop",
  },
  {
    label: "6 - 12",
    value: "6-12",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop",
  },
  {
    label: "12+",
    value: "12+",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
  },
];

export default function AgeRangeSection() {

    return (

        <div className="flex justify-content-between">
            <h4 className="mb-3">Sản phẩm theo độ tuổi</h4>

            {ageCategories.map((item) => (
            <div key={item.value} style={{ width: "18%" }}>
                <Link href={`/product?ageRange=${item.value}`}>
                <div className="card shadow-sm text-center">
                    <img
                    src={item.image}
                    alt={item.label}
                    style={{ height: "100px", objectFit: "cover" }}
                    />
                    <div className="p-2">{item.label}</div>
                </div>
                </Link>
            </div>
            ))}
        </div>
    )
}              