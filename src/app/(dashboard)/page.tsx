// app/page.tsx (Server Component)

import Link from "next/link";
import ProductCategory from "../component/ProductCategory";
import AgeRangeSection from "../component/AgeRangeSection";
import BrandSection from "../component/BrandSection";
import NewProducts from "../component/ProductsSection";
import NewProductsSection from "../component/ProductsSection";
import CategorySetion from "../component/CategorySection";
import ProductsSection from "../component/ProductsSection";

async function getNewProducts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products?sort=createdAt,desc&page=0&size=3`,
    {
      cache: "no-store", // luôn lấy mới nhất
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

async function getBestSellerProducts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/best-seller?limit=3`,
    {
      cache: "no-store", // luôn lấy mới nhất
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

async function getOnSaleProducts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/on-sale?limit=3`,
    {
      cache: "no-store", // luôn lấy mới nhất
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export default async function HomePage() {
  const newProduct = await getNewProducts();
  const bestSellerProduct = await getBestSellerProducts();
  const onSalerProduct = await getOnSaleProducts();

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      <h4 className="mb-3">Danh muc san pham</h4>
      <CategorySetion/>
      <h4 className="mb-3">San pham moi</h4>
      <ProductsSection products={newProduct.content} />
      <h4 className="mb-3">San pham ban chay</h4>
      <ProductsSection products={bestSellerProduct} />
      <h4 className="mb-3">San pham dang ha gia</h4>
      <ProductsSection products={onSalerProduct} />
      <AgeRangeSection/>
      <BrandSection/>
      </div>
  );
}