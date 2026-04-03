"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Category = {
  id: number;
  categoryName: string;
  logo: string;
};

export default function CategorySetion(){
  const [categories, setCategories] = useState<Category[]>([]);
  
    useEffect(() => {
      fetch("/api/v1/categories/parents")
        .then((res) => res.json())
        .then((data) => setCategories(data))
        .catch((err) => console.error(err));
    }, []);
    
  return (
    <div className="flex flex-row flex-nowrap overflow-auto gap-3">
      {categories.map((c) => (
        <div
          key={c.id}
          style={{
            minWidth: "140px",
            flex: "0 0 auto",
          }}
        >
          <Link href={`/product?categoryId=${c.id}`}>
            <div
              className="card shadow-sm text-center p-2"
              style={{ cursor: "pointer", transition: "0.2s" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <img
                src={c.logo}
                alt={c.categoryName}
                style={{
                  height: "80px",
                  objectFit: "contain",
                  margin: "0 auto",
                }}
              />

              <div className="mt-2" style={{ fontSize: "14px" }}>
                {c.categoryName}
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}