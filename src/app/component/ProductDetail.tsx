"use client";

import { useState } from "react";

type Gender = "BOY" | "GIRL" | "UNISEX";

interface Category {
  id: number;
  categoryName: string;
}

interface Brand {
  id: number;
  brandName: string;
}

interface Product {
  productName: string;
  productCode: string;
  price: number;
  images: string[];
  gender : Gender ;
  category : Category;
  brand : Brand;
}

export default function ProductDetail({ product }: { product: Product }) {
  const [current, setCurrent] = useState(0);

  return (
    <div className="container mt-5">

      <div className="row">

        {/* IMAGE */}
        <div className="col-md-6">

          {/* MAIN IMAGE */}
          <img
            src={product.images[current]}
            className="img-fluid border"
            style={{ width: "100%", height: "400px", objectFit: "cover" }}
          />

          {/* THUMBNAILS */}
          <div className="d-flex mt-3 gap-2 overflow-auto">

            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                onClick={() => setCurrent(index)}
                style={{
                  width: 80,
                  height: 80,
                  objectFit: "cover",
                  cursor: "pointer",
                  border:
                    current === index
                      ? "2px solid red"
                      : "1px solid #ccc"
                }}
              />
            ))}

          </div>
        </div>

        {/* PRODUCT INFO */}
        <div className="col-md-6">

          <h2>{product.productName}</h2>

          <h3 className="text-danger">
            {product.price.toLocaleString()} ¥
          </h3>

          <p>
            <b>Brand:</b> {product.brand.brandName}
          </p>

        </div>

      </div>
    </div>
  );
}