"use client";

import { useAuthCard } from "@/app/context/AuthCardContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {
    const [user, setUser] = useState<any>(null);
    const { cart } = useAuthCard();
    const [cartDetail, setCartDetail] = useState<any[]>([]);
    const router = useRouter();

    useEffect(() => {

        if (cart.length === 0) {
        setCartDetail([]);
        return;
        }

        fetch("/api/v1/carts/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(cart)
        })
        .then(res => res.json())
        .then(data => {
            setCartDetail(data);
            console.log("data:",data);
        });

    }, [cart]);

    useEffect(() => {
        const role = JSON.parse(localStorage.getItem("user")|| "{}").role;
        const token = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        const fetchUsers = (accessToken: string) => {
            return fetch("/api/v1/users/me", {
                headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
                }
            }).then(res => res.ok ? res.json() : Promise.reject(res));
        };

        if (token) {
            fetchUsers(token!)
                .then((data) => {
                    setUser(data)})
                .catch(() => {
                    fetch("/api/v1/auth/refreshtoken", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ role, refreshToken }),
                    })
                        .then(res => res.ok ? res.json() : router.push("/login"))
                        .then(result => {
                            if (result) {
                            localStorage.setItem("accessToken", result.data.accessToken);
                            localStorage.setItem("refreshToken", result.data.refreshToken);
                            // Gọi lại fetch user sau khi refresh
                            return fetchUsers(result.data.accessToken);
                            }
                        })
                            .then(data => {
                                setUser(data)})
                            .catch(err => console.error("Fetch by access token failed:", err));
                });
            } else {
            router.push("/login")
        }
    }, []);

    const order = async () => {
        const role = JSON.parse(localStorage.getItem("user")|| "{}").role;
        const token = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        const fetchUsers = (accessToken: string) => {
            return fetch("/api/v1/orders", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`    
                },
                body:JSON.stringify(cartDetail)
            }).then(res => {if (!res.ok) throw res});
        };

        if (token) {
            fetchUsers(token!)
                .then(() => router.push("/order-success"))
                .catch(() => {
                    fetch("/api/v1/auth/refreshtoken", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ role, refreshToken }),
                    })
                        .then(res => res.ok ? res.json() : router.push("/login"))
                        .then(result => {
                            if (result) {
                            localStorage.setItem("accessToken", result.data.accessToken);
                            localStorage.setItem("refreshToken", result.data.refreshToken);
                            // Gọi lại fetch user sau khi refresh
                            return fetchUsers(result.data.accessToken);
                            }
                        })
                            .then(() => router.push("/order-success"))
                            .catch(err => console.error("Fetch by access token failed:", err));
                });
            } else {
            router.push("/login")
        }
    }

    console.log("cart:",cart);

  console.log("cartDetail:",cartDetail);
  return (
    <main className="p-6">
        { (user) &&
            <div>
                <p>{user.id}</p>
                <p>{user.username}</p>
            </div>
        }
        <button
            onClick={order}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            >
            Đặt hàng
        </button>

        
    </main>
  );
}
