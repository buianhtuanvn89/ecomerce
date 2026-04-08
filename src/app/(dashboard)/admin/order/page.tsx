"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import OrderSearch from "@/app/component/OrderSearch";
import OrderStatusFilter from "@/app/component/OrderStatusFilter";
import OrderSort from "@/app/component/OrderSort";
import OrderGrid from "@/app/component/OrderGrid";
import DataPagination from "@/app/component/DataPagination";

type Order = {
  orderId: number;
  userName: string;
  totalPrice: number;
  status: string;
  createdAt: string;
};

type PageResponse = {
  content: Order[];
  totalElements: number;
  size: number;
  number: number;
};

export default function OrdersPage() {
  const searchParams = useSearchParams();

  const [ordersPage, setOrdersPage] = useState<PageResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);

    try {

      const res = await fetch(
        `/api/v1/orders?${searchParams.toString()}`
      );

      if(!res.ok) throw new Error("Fetch failed")

      const data = await res.json();
      setOrdersPage(data);
      setLoading(false);
    }
    catch (err) {
      console.log(err);
    }
  };

  const status = searchParams.get("status");
  const page = searchParams.get("page");
  const sort = searchParams.get("sort");
  const query = searchParams.get("query");



    useEffect(() => {
        fetchOrders();
        }, [status, page, sort, query]);

  if (loading || !ordersPage) return <p>Loading...</p>;
  console.log(ordersPage)
  return (
    <div>
      <h1>Order Management</h1>

      {/* SEARCH */}
      <OrderSearch />

      {/* FILTER */}
      <OrderStatusFilter />

      {/* SORT */}
      <OrderSort />

      {/* LIST */}
      <OrderGrid orders={ordersPage.content} />

      {/* PAGINATION */}
      <DataPagination
        totalElement={ordersPage.totalElements}
        size={ordersPage.size}
        page={ordersPage.number}
      />
    </div>
  );
}