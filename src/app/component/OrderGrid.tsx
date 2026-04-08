"use client";

import { useRouter } from "next/navigation";

type Order = {
  id: number;
  userName: string;
  totalPrice: number;
  status: string;
  createdAt: string;
};

export default function OrderGrid({ orders }: { orders: Order[] }) {
    const router = useRouter();
  return (
    <div>
      {orders.map((o) => (
        <div key={o.id}>
          <p>User: {o.userName}</p>
          <p>Price: {o.totalPrice}</p>
          <p>Status: {o.status}</p>
          <p>Date: {o.createdAt}</p>
          <button onClick={() => router.push(`/admin/order/${o.id}`)}>
            Edit
          </button>
        </div>
      ))}
    </div>
  );
}