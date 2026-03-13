"use client";

import { useEffect, useState } from "react";
import CategorySidebar from "../component/CategorySidebar";

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
  const name = localStorage.getItem("userName");
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  if (userName) setUserName(userName);

  const fetchUsers = (accessToken: string) => {
    return fetch("/api/v1/products", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      }
    }).then(res => res.ok ? res.json() : Promise.reject(res));
  };

  fetchUsers(token!)
    .then((data) => {
      setProducts(data)})
    .catch(() => {
      fetch("/api/v1/auth/refreshtoken", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, refreshToken }),
      })
      .then(res => res.ok ? res.json() : Promise.reject("Refresh failed"))
      .then(result => {
        if (result) {
          localStorage.setItem("accessToken", result.data.accessToken);
          localStorage.setItem("refreshToken", result.data.refreshToken);
          localStorage.setItem("userName", result.data.userName);
          localStorage.setItem("role", result.data.role);
          // Gọi lại fetch user sau khi refresh
          return fetchUsers(result.data.accessToken);
        }
      })
      .then(data => {
        setProducts(data)})
      .catch(err => console.error("Refresh or fetch failed:", err));
    });
}, []);

  return (
    <main className="p-6">
      {userName && 
        <h2 className="text-xl font-semibold mb-4">
          Xin chào, {userName} 
        </h2>
      }
      <h1 className="text-2xl font-bold mb-4">Danh sách Product (client side)</h1>
      <ul className="space-y-2"> 
        {(products.length != 0) && products.map((product) => ( 
          <li
            key={product.id}
            className="border p-3 rounded-lg shadow-sm hover:bg-gray-50"
          >
            <p>{product.id}</p>
            <p>{product.productName}</p>
            <p>{product.price}</p> 
          </li>
        ))}
      </ul>
    </main>
  );
}
