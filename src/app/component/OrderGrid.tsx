"use client";

import { useRouter } from "next/navigation";

type Order = {
  orderId: number;
  userName: string;
  totalPrice: number;
  status: string;
  createdAt: string;
};

export default function OrderGrid({ orders }: { orders: Order[] }) {
    const router = useRouter();
  return (
    <div>
      {orders.map((o:Order) => (
        <div key={o.orderId}>
          <p>User: {o.userName}</p>
          <p>Price: {o.totalPrice}</p>
          <p>Status: {o.status}</p>
          <p>Date: {o.createdAt}</p>
          <button onClick={() => router.push(`/admin/order/${o.orderId}`)}>
            Edit
          </button>
        </div>
      ))}
    </div>
  );
}