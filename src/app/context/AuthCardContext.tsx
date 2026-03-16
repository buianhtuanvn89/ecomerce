"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface UserInfo {
  userName: string;
  role : string;
}

interface CartInfo {
  productId: number;
  quantity: number;
}

interface AuthCardContextType {
  user: UserInfo | null;
  setUser: (user: UserInfo | null) => void;
  logout: () => void;
  cart : CartInfo[];
  addToCart : (productId: number) => void;
}

const AuthCardContext = createContext<AuthCardContextType | undefined>(undefined);

export const AuthCardProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
      const localCart = localStorage.getItem("cart");
      if (localCart) {
        setCart(JSON.parse(localCart));
      }
    }, []);

   const addToCart = (productId: number) => {
    const newCart = [...cart];
    const index = newCart.findIndex(i => i.productId === productId);

    if (index >= 0) {
      const updateCart = newCart.filter(i => i.productId !== productId);
      setCart(updateCart);
    } else {
      newCart.push({ productId, quantity: 1 });
      setCart(newCart);
    }

    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };

  return (
    <AuthCardContext.Provider value={{ user, setUser, logout, cart, addToCart }}>
      {children}
    </AuthCardContext.Provider>
  );
};

export const useAuthCard = () => {
  const context = useContext(AuthCardContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};