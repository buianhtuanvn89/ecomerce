"use client";

import Link from "next/link";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import 'swiper/css';
import 'swiper/css/navigation';

export default function ProductCategory({
  category,
  products,
}: any) {
  return (
    <div>
      {/* 🔥 Category title */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          {category.categoryName}
        </h2>

        <Link
          href={`/products?categoryId=${category.id}`}
          className="text-blue-500"
        >
          Xem thêm →
        </Link>
      </div>

      {/* 🔥 Product list */}

        <Swiper
        slidesPerView={4} 
        spaceBetween={10}
        navigation
        modules={[Navigation]}
        >
            {products.map((p:any) => (
                <SwiperSlide key={p.id}>
                    <img
                    src={p.thumbnail}
                    className="w-full h-40 object-cover rounded"
                    />

                    <p className="mt-2 text-sm line-clamp-2">
                    {p.productName}
                    </p>

                    <p className="text-red-500 font-semibold">
                    ¥ {p.price}
                    </p>
                </SwiperSlide>
            ))}
        </Swiper>

      
    </div>
  );
}