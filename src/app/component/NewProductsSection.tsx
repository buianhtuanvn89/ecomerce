"use client";

import Link from "next/link";

type Product = {
  id: number;
  productName: string;
  price: number;
  thumbnail: string;
};

export default function NewProductsSection({ products }: { products: Product[] }) {
  return (
    <div className="flex flex-row flex-nowrap overflow-auto gap-3">
      {products.map((p) => (
        <div
          key={p.id}
          style={{ minWidth: "160px", flex: "0 0 auto" }}
        >
          <Link href={`/product/${p.id}`}>
            <div
              className="card shadow-sm"
              style={{ cursor: "pointer", transition: "0.2s" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <img
                src={p.thumbnail}
                alt={p.productName}
                style={{ height: "120px", objectFit: "cover" }}
              />

              <div className="p-2">
                <div style={{ fontSize: "14px" }}>
                  {p.productName}
                </div>

                <div className="fw-bold text-danger">
                  ¥{p.price}
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}