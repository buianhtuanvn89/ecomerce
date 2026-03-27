"use client";

import { useState } from "react";
import { useAuthCard } from "@/app/context/AuthCardContext";
import { useRouter } from "next/navigation";

export default function Login() {
  const { user, setUser, cart, setCart } = useAuthCard();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const pushAndGetCart = async (userName : string) =>{
    if (cart.length !=0 ) {
      await fetch(`/api/v1/carts/add?userName=${userName}`,{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            {
              items:cart,
            }
          ),   
      })
      localStorage.removeItem("cart");

    }

    const getRes = await fetch(`/api/v1/carts?userName=${userName}`);
    if (getRes.ok) {
      const localCart = await getRes.json();
      setCart(localCart);
    }
  }

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!res.ok) {
        throw new Error("Sai tài khoản hoặc mật khẩu");
      }

      const result = await res.json();

      // 🔥 Lưu localStorage
      localStorage.setItem("accessToken", result.data.accessToken);
      localStorage.setItem("refreshToken", result.data.refreshToken);

      const userInfo = {
        userName: result.data.userName,
        role: result.data.role,
      };

      localStorage.setItem("user", JSON.stringify(userInfo));

      // 🔥 Update context
      if (!user) {
        pushAndGetCart(result.data.userName);
        setUser(userInfo);
        router.push("/cart")
      } else {
        router.push("/user")

      }

      // window.location.reload();
    
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          
          padding: "30px",
          borderRadius: "8px",
          width: "300px",
        }}
      >
        <h2>Login</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", marginBottom: 10 }}
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: 10 }}
        />

        {error && (
          <p style={{ color: "red", fontSize: 14 }}>{error}</p>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{ width: "100%" }}
        >
          {loading ? "Đang đăng nhập..." : "Login"}
        </button>

        <button
          onClick={() => {router.push("/cart")}}
          style={{ marginTop: 10, width: "100%" }}
        >
          Close
        </button>
      </div>
    </div>
  );
}