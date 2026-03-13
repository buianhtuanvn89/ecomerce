"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface UserInfo {
  userName: string;
  role : string;
}

interface AuthCardContextType {
  user: UserInfo | null;
  setUser: (user: UserInfo | null) => void;
  logout: () => void;
}

const AuthCardContext = createContext<AuthCardContextType | undefined>(undefined);

export const AuthCardProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };

  return (
    <AuthCardContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthCardContext.Provider>
  );
};

export const useAuthCard = () => {
  const context = useContext(AuthCardContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};