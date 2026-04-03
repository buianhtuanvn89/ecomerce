// app/page.tsx (Server Component)

import Link from "next/link";
import ProductCategory from "../component/ProductCategory";
import AgeRangeSection from "../component/AgeRangeSection";
import BrandSection from "../component/BrandSection";
import NewProducts from "../component/NewProductsSection";
import NewProductsSection from "../component/NewProductsSection";
import CategorySetion from "../component/CategorySection";

// async function getCategories() {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories/parents`,
//     { cache: "no-store" }
//   );
//   return res.json();
// }

async function getProducts() {
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

async function getCategories() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories/parents`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch categories");

  return res.json();
}

export default async function HomePage() {
  const categories = await getCategories();
  const data = await getProducts();

  // // 🔥 fetch song song
  // const data = await Promise.all(
  //   categories.map(async (cat: any) => {
  //     const products = await getProducts(
  //       `categoryId=${cat.id}`
  //     );

  //     return {
  //       category: cat,
  //       products: products.content, // nếu backend trả Page
  //     };
  //   })
  // );



  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      <CategorySetion categories={categories}/>
      <NewProductsSection products={data.content} />

      <AgeRangeSection/>
      <BrandSection/>
      {/* {data.map((item: any) => (
        <ProductCategory
          key={item.category.id}
          category={item.category}
          products={item.products}
        />
      ))} */}
    </div>
  );
}