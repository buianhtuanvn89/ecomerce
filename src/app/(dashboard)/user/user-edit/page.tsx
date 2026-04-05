"use client";

import { useAuthCard } from "@/app/context/AuthCardContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {
    const router = useRouter();
    const [form, setForm] = useState({
        userName: "",
        email: "",
        firstName: "",
        lastName: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

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
                        setForm({
                            userName: data.userName,
                            email: data.email,
                            firstName: data.firstName,
                            lastName: data.lastName,
                        });
                    })
                    .catch(() => {
                        fetch("/api/v1/auth/refreshtoken", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ role, refreshToken }),
                        })
                            .then(res => res.ok ? res.json() : router.push("/login?redirect=/user/user-edit"))
                            .then(result => {
                                if (result) {
                                localStorage.setItem("accessToken", result.data.accessToken);
                                localStorage.setItem("refreshToken", result.data.refreshToken);
                                // Gọi lại fetch user sau khi refresh
                                return fetchUsers(result.data.accessToken);
                                }
                            })
                                .then(data => {
                                    if (data) {
                                        setForm({
                                            userName: data.userName,
                                            email: data.email,
                                            firstName: data.firstName,
                                            lastName: data.lastName,
                                        })
                                    }})                                        
                                .catch(err => console.error("Fetch by access token failed:", err));
                    });
                } else {
                router.push("/login")
            }
        }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();



        if (!form.email.includes("@")) {
        setMessage("Email không hợp lệ");
        return;
        }

        try {
        setLoading(true);
        setMessage("");

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/me`,
            {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(form),
            }
        );

        if (!res.ok) throw new Error();

        setMessage("Cập nhật thành công ✅");
        } catch (err) {
        setMessage("Update thất bại ❌");
        } finally {
        setLoading(false);
        }
    };

     return (
        <div className="container mt-5" style={{ maxWidth: "500px" }}>
        <h2 className="mb-4">Edit Profile</h2>

        {message && <div className="alert alert-info">{message}</div>}
        {/* {(form.userName) && */}
            <form onSubmit={handleSubmit}>
                <input
                className="form-control mb-3"
                name="userName"
                placeholder="Username"
                value={form.userName}
                onChange={handleChange}
                />

                <input
                className="form-control mb-3"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                />

                <input
                className="form-control mb-3"
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
                />

                <input
                className="form-control mb-3"
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
                />

                <button
                className="btn btn-primary w-100"
                disabled={loading}
                >
                {loading ? "Đang cập nhật..." : "Update"}
                </button>
            </form>
        {/* } */}
        </div>
    );
}
