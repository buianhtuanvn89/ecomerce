"use client";

import { use, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

type OrderResponse = {
  orderId: number;
  userName: string;
  totalPrice: number;
  status: string;
  createdAt: string;
};

export default function OrderEditPage({params}:{params : Promise<{ id: string }>}) {
  const router = useRouter();

const { id } = use(params);

  const [order, setOrder] = useState<OrderResponse | null>(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchOrder = async () => {
    const res = await fetch(
      `/api/v1/orders/${id}`
    );
    const data = await res.json();

    setOrder(data);
    setStatus(data.status);
  };

  useEffect(() => {
    if (id) fetchOrder();
  }, [id]);

  const handleSubmit = async () => {
    setLoading(true);

    await fetch(
      `/api/v1/orders/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(status),
      }
    );

    setLoading(false);
    alert("Thay doi order thanh cong");

    router.push("/admin/order");
  };

  if (!order) return <p>Loading...</p>;

  return (
    <div>
      <h1>Edit Order</h1>

      <p>User: {order.userName}</p>
      <p>Price: {order.totalPrice}</p>
      <p>Date: {order.createdAt}</p>

      {/* EDIT STATUS */}
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="PENDING">PENDING</option>
        <option value="CONFIRMED">CONFIRMED</option>
        <option value="SHIPPING">SHIPPING</option>
        <option value="DELIVERED">DELIVERED</option>
        <option value="CANCELLED">CANCELLED</option>
      </select>

      <br />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Updating..." : "Update"}
      </button>
    </div>
  );
}