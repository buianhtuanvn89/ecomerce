"use client";

import { useAuthCard } from "@/app/context/AuthCardContext";

export default function CartPage() {

  const { user, cart, addCartItem, removeCartItem, setCart } = useAuthCard();

  const totalPrice = cart.reduce((sum:any, item:any) => {
    return sum + item.price * item.quantity;
  }, 0);
   console.log(cart);

  return (
    <div className="max-w-4xl mx-auto p-6">

      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
 
      {cart.length === 0 && ( 
        <p>Your cart is empty</p>
      )}

      {cart.map((item:any) => (
        <div
          key={item.productId}
          className="flex items-center justify-between border-b py-4"
        >

          {/* Product info */}
          <div className="flex items-center gap-4">

            {/* <img
              src={item.image}
              className="w-20 h-20 object-cover"
            /> */}

            <div>
              <h2 className="font-semibold">{item.productId}</h2>
              {/* <p>{item.price} ¥</p> */}
            </div>

          </div>

          {/* Quantity */}
          <div className="flex items-center gap-2">

            <button
                className="px-2 border"
                disabled={item.quantity === 1}
                onClick={() => {
                    const updateCart = cart.map(i =>  i.productId === item.productId
                                ? { ...i, quantity: i.quantity - 1 } : i)
                    setCart(updateCart);

                    if (user) {
                        removeCartItem(item.productId,false)
                    } else {
                        localStorage.setItem("cart", JSON.stringify(updateCart))
                    }

                }}
            >
              -
            </button>

            <span>  {item.quantity}  </span>

            <button
                className="px-2 border"
                onClick={() => {
                    const updateCart = cart.map(i =>  i.productId === item.productId
                                    ? { ...i, quantity: i.quantity + 1 } : i)
                        setCart(updateCart);

                        if (user) {
                            addCartItem(item.productId);
                        } else {
                            localStorage.setItem("cart", JSON.stringify(updateCart))
                        }
                }}
            >
              +
            </button>

          </div>

          {/* Sub total */}
          {/* <div className="w-24 text-right">
            {item.price * item.quantity} ¥
          </div> */}

          {/* Remove */}
          <button
                className="text-red-500"
                onClick={() => {
                    const updateCart = cart.filter(i => i.productId !== item.productId);
                    setCart(updateCart);
                    if (!user) 
                        {localStorage.setItem("cart", JSON.stringify(updateCart))}
                        else {
                            removeCartItem(item.productId,true);
                        }                    
                }}
          >
            Remove
          </button>

        </div>
      ))}

      {/* Total */}
      {/* <div className="text-right mt-6 text-xl font-bold">
        Total: {totalPrice} ¥
      </div> */}

    </div>
  );
}