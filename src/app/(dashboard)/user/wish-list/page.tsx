"use client";

import { useAuthCard } from "@/app/context/AuthCardContext";
import { useEffect, useState } from "react";

type WishListItem = {
  productId: number;
  productName: string;
  price: number;
  imageUrl: string;
};

export default function WishListPage() {
  const [wishList, setWishList] = useState<WishListItem[]>([]);
  const [loading, setLoading] = useState(true);

  const {user} = useAuthCard();

  const fetchWishList = async () => {
    try {
      const res = await fetch(
        `/api/v1/wish-list?userName=${user?.userName}`
      );
      const data = await res.json();

      setWishList(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Lỗi load wishlist", error);
      setWishList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchWishList();
    }
  }, [user]);

  const handleRemove = async (productId: number) => {
    await fetch(`/api/v1/wish-list/${productId}?userName=${user?.userName}`, {
      method: "DELETE",
    });

    // update UI luôn (không cần reload)
    setWishList((prev) =>
      prev.filter((item) => item.productId !== productId)
    );
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2>❤️ Wishlist của bạn</h2>

      {wishList.length === 0 ? (
        <p>Chưa có sản phẩm nào</p>
      ) : (
        <div className="row">
          {wishList.map((item) => (
            <div className="col-md-3 mb-4" key={item.productId}>
              <div className="card h-100 shadow-sm">
                <img
                  src={item.imageUrl}
                  alt={item.productName}
                  className="card-img-top"
                  style={{ height: 200, objectFit: "cover" }}
                />

                <div className="card-body">
                  <h5>{item.productName}  {item.productId}</h5>
                  <p className="text-danger fw-bold">
                    {item.price.toLocaleString()} ¥
                  </p>
                </div>

                <div className="card-footer d-flex justify-content-between">
                  <button className="btn btn-sm btn-primary">
                    Xem
                  </button>

                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleRemove(item.productId)}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}