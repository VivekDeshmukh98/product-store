// import React, { useState } from 'react'
import { useEffect, useState } from "react";
import type { Product } from "../interfaces/Product";
import { Link } from "react-router-dom";

export const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            
          {products.map((product) => (
            <Link to={`/product/${product.id}`} className="group" key={product.id}>
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
                />
                <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  ${product.price}
                </p>
              </div>
            </Link>
          ))}
           
        </div>
      </div>
    </div>
  );
};
