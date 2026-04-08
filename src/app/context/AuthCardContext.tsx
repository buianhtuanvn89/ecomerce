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
  wishList : number[];
  handleWishList : (id: number) => void;
  setWishList : (wishList: number[]) => void;
}

const AuthCardContext = createContext<AuthCardContextType | undefined>(undefined);

export const AuthCardProvider = ({ children }: { children: React.ReactNode }) => {
  console.log("usecontext rerender")
  const [user, setUser] = useState<UserInfo | null>(null);
  const [cart, setCart] = useState<CartInfo[]>([]);
  const [wishList, setWishList] = useState<number[]>([]);

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

  const addWishListItem = async (productId:number) =>{
    await fetch(`/api/v1/wish-list/${productId}?userName=${user?.userName}`,{
      method:"POST",
    })
  }

   const removeWishListItem = async (productId:number) =>{
    await fetch(`/api/v1/wish-list/${productId}?userName=${user?.userName}`,{
      method:"DELETE",
    })
  }

  const getCart = async (userName : string) => {
    const res = await fetch(`/api/v1/carts?userName=${userName}`)
    const localCart = await res.json();
    setCart(localCart);
  }

   const getWishList = async (userName : string) => {
    const res = await fetch(`/api/v1/wish-list?userName=${userName}`)
    const result = await res.json();
    const localWishList = Array.isArray(result)
            ? result.map((r: any) => r.productId)
            : [];    
    setWishList(localWishList);
  }

  useEffect(() => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        const localCart = localStorage.getItem("cart");
        if (localCart) {
          setCart(JSON.parse(localCart));
        }
        const localWishList = localStorage.getItem("wishList");
        if (localWishList) {
          setWishList(JSON.parse(localWishList));
        }
      } else {
        getCart(JSON.parse(storedUser).userName);
        setUser(JSON.parse(storedUser));
        getWishList(JSON.parse(storedUser).userName);
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

  const handleWishList = (id: number) => {
    const newList = [...wishList];
    const index = newList.findIndex(i => i === id);

    if (index >= 0) {
      const updateList = newList.filter(i => i !== id);
      setWishList(updateList);
      if (!user) 
        {localStorage.setItem("wishList", JSON.stringify(updateList))}
        else {
          removeWishListItem(id);
        }
    } else {
      newList.push(id);
      setWishList(newList);
      if (!user) 
        {localStorage.setItem("wishList", JSON.stringify(newList))}
        else {
          addWishListItem(id);
        }
    }
  }

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    setCart([]);
    setWishList([]);
  };

  return (
    <AuthCardContext.Provider value={{ user, setUser, logout, cart, wishList, handleWishList,
                                        addToCart, setCart, addCartItem, removeCartItem, setWishList}}>
      {children}
    </AuthCardContext.Provider>
  );
};

export const useAuthCard = (): AuthCardContextType  => {
  const context = useContext(AuthCardContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};