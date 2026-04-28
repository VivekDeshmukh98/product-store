// import React, { useState } from 'react'
import { useEffect, useMemo, useRef, useState } from "react";
import type { Product } from "../interfaces/Product";
import { Link } from "react-router-dom";

export const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search,setSearch]=useState("")
  const searchInputRef= useRef<HTMLInputElement>(null)  //useRef to access the input element directly

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
      searchInputRef.current?.focus() //focus the input element when the component mounts
  }, []);

  const filtered = useMemo(() => {
  return products.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase())
  )
}, [products, search])  // only recalculate when these change!

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="mb-8">
          <div className="relative">
            <input
              ref={searchInputRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full px-4 py-3 pl-12 text-gray-900 placeholder-gray-500 bg-gray-50 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-900"
            />
            <span className="absolute left-4 top-3.5 text-gray-400 dark:text-gray-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
          </div>
          {search && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Found {filtered.length} product{filtered.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {filtered.map((product) => (
            <Link
              to={`/product/${product.id}`}
              className="group"
              key={product.id}
            >
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
