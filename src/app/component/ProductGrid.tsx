"use client";

import { useAuthCard } from "../context/AuthCardContext";

export default function ProductGrid({ products }:{products : any[]}) {
  const { cart, addToCart } = useAuthCard();

  const isInCart = (id:number) => {
    return cart.some((item:any) => item.id === id);
  };

  return (
    <div className="grid grid-cols-3 gap-6">
        {products.slice(0,12).map((product) => {
            const inCart = isInCart(product.id);

            return (
            <div
                key={product.id}
                className="border rounded-lg p-4 shadow hover:shadow-md"
            >
                <img
                src="https://picsum.photos/300/200"
                className="w-full h-40 object-cover mb-3"
                />

                <h2 className="font-semibold">{product.productName}</h2>
                <p className="text-gray-600">{product.price} ¥</p>

                {inCart ? (
                <button
                    onClick={() => addToCart(product.id)}
                    className="mt-3 w-full bg-red-500 text-white py-2 rounded"
                >
                    Remove from Cart
                </button>
                ) : (
                <button
                    onClick={() => addToCart(product)}
                    className="mt-3 w-full bg-blue-500 text-white py-2 rounded"
                >
                    Add to Cart
                </button>
                )}
            </div>
            );
        })}
        <div className="bg-red-500 text-white p-4">
  test
</div>
    </div>
    
  );
}