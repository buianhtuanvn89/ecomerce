"use client";

import { useRouter } from "next/navigation";

export default function OrderSuccessPage() {
  const router = useRouter();

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
        
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          🎉 Đặt hàng thành công!
        </h1>

        <p className="text-gray-600 mb-6">
          Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đang được xử lý.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => router.push("/")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Về trang chủ
          </button>

          <button
            onClick={() => router.push("/orders")}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Xem đơn hàng
          </button>
        </div>

      </div>
    </main>
  );
}