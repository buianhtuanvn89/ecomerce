"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from "swiper/modules";
import { useAuthCard } from "../context/AuthCardContext";

export default function ProductDetail({ product }: any) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const {cart,addToCart} = useAuthCard();

  const isInCart = (id:number) => {
  return cart.some((item:any) => item.productId === id);


  };
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-2 gap-10">
        
        {/* 🔥 LEFT: IMAGE */}
        <div>
          {/* Ảnh lớn */}
          <div className="mb-4 border rounded-xl overflow-hidden">
            <img
              src={product.images[selectedIndex]}
              className="w-full h-[450px] object-cover"
            />
          </div>

          {/* Thumbnail */}
          <Swiper 
            slidesPerView={4} 
            spaceBetween={10}
            navigation
            modules={[Navigation]}
          >
            {product.images.map((img: string, index: number) => (
              <SwiperSlide key={index}>
                <img
                  src={img}
                  onClick={() => setSelectedIndex(index)}
                  className={`h-20 w-full object-cover rounded-lg cursor-pointer border-2
                  ${
                    selectedIndex === index
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* 🔥 RIGHT: PRODUCT INFO */}
        <div>
          <h1 className="text-2xl font-bold mb-4">
            {product.productName}
          </h1>

          <p className="text-red-500 text-2xl font-semibold mb-4">
            ¥ {product.price}
          </p>

          <p className="mb-2">
            <span className="font-semibold">Brand:</span>{" "}
            {product.brand?.brandName}
          </p>

          <p className="mb-2">
            <span className="font-semibold">Category:</span>{" "}
            {product.category?.categoryName}
          </p>

          <p className="mt-4 text-gray-600">
            {product.description}
          </p>

          {/* Button */}
          {isInCart(product.id) ? (
            <button
                onClick={() => addToCart(product.id)}
                className="mt-3 w-full bg-red-500 text-white py-2 rounded"
            >
                Remove from Cart
            </button>
            ) : (
            <button
                onClick={() => addToCart(product.id)}
                className="mt-3 w-full bg-blue-500 text-white py-2 rounded"
            >
                Add to Cart
            </button>
            )}
        </div>

      </div>
    </div>
  );
}