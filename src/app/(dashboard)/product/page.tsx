import ProductGrid from "@/app/component/ProductGrid"
import ProductPagination from "@/app/component/ProductPagination"
import SidebarFilter from "@/app/component/SidebarFilter"
import SortDropdown from "@/app/component/SortDropdown"

type Props = {
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

export default async function Page({searchParams }: Props) {
  const queryParams  = new URLSearchParams();
  const paramsObj = await searchParams;

    Object.entries(paramsObj).forEach(([key, value]) => {

      if (Array.isArray(value)) {
        value.forEach(v => queryParams.append(key, v));
      } else if (value) {
        queryParams .append(key, value);
      }
    });
    
  const query = queryParams .toString();
  const productsPage = await getProducts(query);
  const products = productsPage.content;

  return (
    <div>
      <SidebarFilter/>
      <SortDropdown/>
      <h1>Product List</h1>

      <ProductGrid products = {products}/>

       <ProductPagination
        totalElement={productsPage.totalElements}
        size={productsPage.size}
        page={productsPage.number}
      />
    </div>
  )
}