"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

/* ================= TYPES ================= */

type OrderItemResponse = {
  productName: string;
  quantity: number;
  price: number;
  imageUrl: string;
};

type OrderHistoryResponse = {
  orderId: number;
  createdAt: string;
  totalPrice: number;
  status: string;
  orderItemResponses: OrderItemResponse[];
};

type PageResponse<T> = {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
};

/* ================= PAGE ================= */

export default function OrderHistoryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageParam = Number(searchParams.get("page") || 0);

  const [data, setData] = useState<PageResponse<OrderHistoryResponse> | null>(null);

  const fetchOrders = async (page: number) => {
    const token = localStorage.getItem("accessToken");

    const res = await fetch(
      `/api/v1/orders/history?page=${page}&size=5&sort=createdAt,desc`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const json = await res.json();
    setData(json);
  };

  useEffect(() => {
    fetchOrders(pageParam);
  }, [pageParam]);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>Lịch sử mua hàng</h2>

      {/* ================= LIST ================= */}
      {data.content.map((order) => (
        <div key={order.orderId} className="card mb-4 p-3 shadow-sm">
          {/* Header */}
          <div className="d-flex justify-content-between">
            <div>
              <strong>Order #{order.orderId}</strong>
              <div>{new Date(order.createdAt).toLocaleString()}</div>
            </div>

            <div>
              <span className="badge bg-success">{order.status}</span>
            </div>
          </div>

          <hr />

          {/* Items */}
          {order.orderItemResponses.map((item, idx) => (
            <div
              key={`${item.productName}-${idx}`}
              className="d-flex align-items-center mb-3"
            >
              <img
                src={item.imageUrl}
                alt={item.productName}
                width={80}
                height={80}
                className="rounded"
              />

              <div className="ms-3 flex-grow-1">
                <div>{item.productName}</div>
                <div>Số lượng: {item.quantity}</div>
              </div>

              <div>
                {(item.price * item.quantity).toLocaleString()} đ
              </div>
            </div>
          ))}

          <hr />

          {/* Footer */}
          <div className="d-flex justify-content-between">
            <strong>
              Tổng: {order.totalPrice.toLocaleString()} đ
            </strong>
            <button className="btn btn-outline-primary btn-sm">
              Xem chi tiết
            </button>
          </div>
        </div>
      ))}

      
    </div>
  );
}