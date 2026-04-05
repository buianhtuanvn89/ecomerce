"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // validate đơn giản
    if (!form.userName || !form.email || !form.password) {
      setMessage("Vui lòng nhập đầy đủ thông tin bắt buộc");
      return;
    }

    if (!form.email.includes("@")) {
      setMessage("Email không hợp lệ");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) {
        throw new Error("Register thất bại");
      }

      setMessage("Đăng ký thành công 🎉");
      setForm({
        userName: "",
        email: "",
        password: "",
        firstName: "",
        lastName: "",
      });
    } catch (err) {
      setMessage("Có lỗi xảy ra khi đăng ký");
    } finally {
      setLoading(false);
    }
  };
    return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4">Register</h2>

      {message && <div className="alert alert-info">{message}</div>}

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
          type="password"
          className="form-control mb-3"
          name="password"
          placeholder="Password"
          value={form.password}
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
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? "Đang đăng ký..." : "Register"}
        </button>
      </form>
    </div>
  );
}