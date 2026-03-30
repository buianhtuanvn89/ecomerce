import ProductDetail from "@/app/component/ProductDetail";

async function getProduct(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/product-detail/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Failed to fetch");

  return res.json();
}

export default async function Page({ params }: { params: { id: string } }) {
    const {id} = await params;
    const product = await getProduct(id);

    return <ProductDetail product={product} />;
}