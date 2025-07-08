"use client";
import React from "react";
import Link from "next/link";

const categories = [
  {
    title: "Mens",
    image: "/images/categories/men.jpg",
    description: "Classic to Casual - Jackets, Jeans & Ethnic",
  },
  {
    title: "Womens",
    image: "/images/categories/women.jpg",
    description: "Sarees, Kurtis, Tops & More Fashion Essentials",
  },
  {
    title: "Kids",
    image: "/images/categories/kids.jpg",
    description: "Trendy and Comfy Styles for All Ages",
  },
];

export default function ShopByCategory() {
  return (
    <section className="mb-6 bg-white">
      <div className=" mb-4">
        <h2 className="text-3xl md:text-4xl font-semibold text-orange-500">
          Shop by Category
        </h2>
        <p className="text-gray-500 mt-1">
          Discover the latest styles for everyone
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mx-auto cursor-pointer ">
        {categories.map((item) => (
          <div
            key={item.title}
            className="relative group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-500"
          >
            {/* Background image */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-50 object-cover transform group-hover:scale-110 transition duration-700 ease-in-out"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col justify-end p-6">
              <h3 className="text-white text-2xl font-bold mb-1 animate-fade-in-up">
                {item.title}
              </h3>
              <p className="text-white mb-4 text-sm">{item.description}</p>
              <Link
                href={`/${item.title.toLowerCase()}`}
                className="bg-orange-500 hover:bg-orange-600 text-center text-white px-4 py-2 rounded transition duration-300 cursor-pointer hover:animate-bounce"
              >
                Explore More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
