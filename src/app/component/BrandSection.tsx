"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Brand = {
  id: number;
  brandName: string;
  logo: string;
};

export default function BrandSection() {
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    fetch("/api/v1/brands")
      .then((res) => res.json())
      .then((data) => setBrands(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="mt-4">
      <h4 className="mb-3">Thương hiệu</h4>

      <div className="flex flex-row flex-nowrap overflow-auto gap-3">
        {brands.map((brand) => (
          <div
            key={brand.id}
            style={{
              minWidth: "120px",
              flex: "0 0 auto",
            }}
          >
            <Link href={`/product?brandIds=${brand.id}`}>
              <div
                className="card shadow-sm text-center p-2"
                style={{ cursor: "pointer" }}
              >
                <img
                  src={brand.logo}
                  alt={brand.brandName}
                  style={{
                    height: "60px",
                    objectFit: "contain",
                    margin: "0 auto",
                  }}
                />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}