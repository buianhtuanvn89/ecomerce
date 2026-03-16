import ProductGrid from "../component/ProductGrid";

export default async function HomePage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/products`, {
    cache: "no-store",
  });

  const productsPage = await res.json();
  const products = productsPage.content;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Danh sách Product</h1>

      <ProductGrid products={products} />
    </main>
  );
}