"use client";


import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ChangePasswordPage() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
      const router = useRouter();
  

  const handleChange = (e :React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    const role = JSON.parse(localStorage.getItem("user")|| "{}").role;
    const token = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    const fetchUsers = (accessToken: string) => {
        return fetch("/api/v1/users/change-password", {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`    
            },
            body:JSON.stringify(form)
        }).then(res => {if (!res.ok) throw res});
    };
    if (token) {
        fetchUsers(token!)
            .then(() => router.push("/user/change-password-success"))
            .catch(() => {
                fetch("/api/v1/auth/refreshtoken", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ role, refreshToken }),
                })
                    .then(res => res.ok ? res.json() : router.push("/login?redirect=/user/change-password"))
                    .then(result => {
                        if (result) {
                        localStorage.setItem("accessToken", result.data.accessToken);
                        localStorage.setItem("refreshToken", result.data.refreshToken);
                        // Gọi lại fetch user sau khi refresh
                        return fetchUsers(result.data.accessToken);
                        }
                    })
                        .catch(err => console.error("Fetch by access token failed:", err));
            });
        } else {
            router.push("/login?redirect=/user/change-password")
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Change Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              value={form.currentPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
