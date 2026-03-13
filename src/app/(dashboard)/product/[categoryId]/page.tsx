import SidebarFilter from "@/app/component/SidebarFilter"

type Props = {
   params: {
    categoryId: string
  }
  searchParams: {
    q?: string
    genders?: string | string[]
    brandIds?: string | string[]
    prices?: string | string[]
  }
}

async function getProducts(params: String) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products?${params}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
}

export default async function Page({params, searchParams }: Props) {
  const queryParams  = new URLSearchParams();
    const paramsObj = await searchParams;

    Object.entries(paramsObj).forEach(([key, value]) => {

      if (Array.isArray(value)) {
        value.forEach(v => queryParams .append(key, v));
      } else if (value) {
        queryParams .append(key, value);
      }

    });
  queryParams.append("categoryId", params.categoryId);
  const query = queryParams .toString();

  const products = await getProducts(query);

  return (
    <div>
      <SidebarFilter/>
      <h1>Product List</h1>

      {products.map((p: any) => (
        <div key={p.id}>
          <p>{p.productName}</p>
          <p>{p.price}</p>
        </div>
      ))}
    </div>
  )
}