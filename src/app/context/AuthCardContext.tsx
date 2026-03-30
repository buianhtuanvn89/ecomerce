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
  setCart : (cart: CartInfo[]) => void;
  addToCart : (id: number) => void;
  addCartItem : (productId:number) => void;
  removeCartItem: (productId:number, removeType:boolean) => void;
}

const AuthCardContext = createContext<AuthCardContextType | undefined>(undefined);

export const AuthCardProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [cart, setCart] = useState<CartInfo[]>([]);


  const addCartItem = async (productId:number) =>{
    await fetch(`/api/v1/carts/add?userName=${user?.userName}`,{
      method:"POST",
      headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {
            items:[
              {
                productId,
                quantity:1,
              } 
            ]  
          }
        ),   
    })
  }

  const removeCartItem = async (productId:number, removeType:boolean) =>{
    await fetch(`/api/v1/carts/remove?userName=${user?.userName}&remove=${removeType}`,{
      method:"POST",
      headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {
            productId,
            quantity:1,
          }
        ),   
    })
  }

  const getCart = async (userName : string) => {
    const res = await fetch(`/api/v1/carts?userName=${userName}`)
    const localCart = await res.json();
    setCart(localCart);
  }


  useEffect(() => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        const localCart = localStorage.getItem("cart");
        if (localCart) {
          setCart(JSON.parse(localCart));
        }
      } else {
        getCart(JSON.parse(storedUser).userName);
        setUser(JSON.parse(storedUser));
      }
  }, []);

   const addToCart = (id: number) => {
    const newCart = [...cart];
    const index = newCart.findIndex(i => i.productId === id);

    if (index >= 0) {
      const updateCart = newCart.filter(i => i.productId !== id);
      setCart(updateCart);
      if (!user) 
        {localStorage.setItem("cart", JSON.stringify(updateCart))}
        else {
          removeCartItem(id,true);
        }
    } else {
      newCart.push({ productId:id, quantity: 1 });
      setCart(newCart);
      if (!user) 
        {localStorage.setItem("cart", JSON.stringify(newCart))}
        else {
          addCartItem(id);
        }
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    setCart([]);
  };

  return (
    <AuthCardContext.Provider value={{ user, setUser, logout, cart, addToCart, setCart, addCartItem, removeCartItem}}>
      {children}
    </AuthCardContext.Provider>
  );
};

export const useAuthCard = (): AuthCardContextType  => {
  const context = useContext(AuthCardContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};