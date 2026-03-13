import CategorySidebar from "@/app/component/CategorySidebar";
import SidebarFilter from "@/app/component/SidebarFilter";

type Props = {
  searchParams: {
    q?: string;
  };
};

async function getProducts(params: string) { 
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products?${params}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
}

export default async function SearchPage({ searchParams }: Props) {
    const params = new URLSearchParams();
    const paramsObj = await searchParams;

    Object.entries(paramsObj).forEach(([key, value]) => {

      if (Array.isArray(value)) {
        value.forEach(v => params.append(key, v));
      } else if (value) {
        params.append(key, value);
      }

    });

  const query = params.toString();

  const products = await getProducts(query);

  return (
    <div>
      <SidebarFilter/>
      <h1>Kết quả tìm kiếm: </h1>

      {products.map((p: any) => (
        <div key={p.id} className="flex justify-between">
            <span>{p.id}</span>

            <span>{p.productName}</span>
        </div>
      ))}
    </div>
  );
}