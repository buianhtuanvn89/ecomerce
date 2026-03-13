"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const verifyKey = searchParams.get("verifyKey"); 
  const router = useRouter();

  useEffect(() => {
    if (verifyKey) {
        fetch(`/api/v1/auth/verifykey?verifyKey=${verifyKey}`, {
            method: "POST",
          })
            .then((res) => {
              if (res.ok) return res.json()
              else throw new Error("Verify failed");
            })
            .then((result) => {
                console.log("data:",result.data);


                if (result.data.accessToken && result.data.refreshToken && result.data.userName && result.data.role) {
                    localStorage.setItem("accessToken", result.data.accessToken);
                    localStorage.setItem("refreshToken", result.data.refreshToken);
                    const userInfo = {
                      userName: result.data.userName,
                      role: result.data.role,
                    };

                    localStorage.setItem("user", JSON.stringify(userInfo));
                    console.log("Tokens saved to localStorage");
                    router.push("/");
                  } else {
                    console.error("Backend không trả token hợp lệ");
                  }
            })
            .catch((err) => {
              console.error(err);
            });
    }    
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1>DAY LA TRANG VERIFY</h1>
     

    </main>
  );
}
