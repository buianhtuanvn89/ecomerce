"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import OrderSearch from "@/app/component/OrderSearch";
import OrderStatusFilter from "@/app/component/OrderStatusFilter";
import OrderSort from "@/app/component/OrderSort";
import OrderGrid from "@/app/component/OrderGrid";
import DataPagination from "@/app/component/DataPagination";

type Order = {
  id: number;
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

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/orders?${searchParams.toString()}`
    );

    const data = await res.json();
    setOrdersPage(data);

    setLoading(false);
  };

  const queryString = searchParams.toString();

    useEffect(() => {
        fetchOrders();
        }, [queryString]);

  if (loading || !ordersPage) return <p>Loading...</p>;

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