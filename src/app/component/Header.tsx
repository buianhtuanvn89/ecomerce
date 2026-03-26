"use client";

import { useState } from "react";
import Login from "../(dashboard)/login/Login";
import { useAuthCard } from "../context/AuthCardContext";
import { useRouter } from "next/navigation";
import SearchBar from "./SearchBar";


export default function Header() {
  const router = useRouter();

  const [showLogin, setShowLogin] = useState(false);
  const { user, logout } = useAuthCard();
  const [open, setOpen] = useState(false);

  const handleLogOut = () => {
    setOpen(false);
    logout();
    // router.push("/");
  }

  return (
    <>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 24px",
          backgroundColor: "#f5f5f5",
          borderBottom: "1px solid #ddd",
        }}
      >
        <h2>MyApp</h2>
        <div>
          {user ? (
            <div
              style={{ position: "relative", display: "inline-block" }}
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            > 
              <span style={{ cursor: "pointer" }}>
                Chào bạn, {user.userName} ▼
              </span>
              {open && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    background: "white",
                    border: "1px solid #ccc",
                    padding: "10px",
                    minWidth: "150px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  <div style={{ padding: "5px 0", cursor: "pointer" }}>
                    Tài khoản
                  </div>
                  <div style={{ padding: "5px 0", cursor: "pointer" }}>
                    Đổi mật khẩu
                  </div>
                  <div
                    style={{ padding: "5px 0", cursor: "pointer", color: "red" }}
                    onClick={handleLogOut}
                  >
                    Đăng xuất
                  </div>
                </div>
              )}
            </div>
          ):
            <button
              style={{
                padding: "8px 16px",
                backgroundColor: "#0070f3",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
              onClick={() => setShowLogin(true)}
            >
              Login
            </button>
        }
        </div>
        
      </header>
      <SearchBar/>
      {showLogin && <Login onClose={() => setShowLogin(false)} />}
    </>
  );
}