import { useParams } from "react-router-dom";
import type { Product } from "../interfaces/Product";
import { useEffect, useState } from "react";

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data: Product = await res.json();
      setProduct(data);
    };

    if (id) fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center">
      <div className="max-w-screen-xl mx-auto px-4 py-10 w-full">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">

          {/* Image Section */}
          <div className="flex items-center justify-center">
            <img
              className="max-h-[450px] object-contain transition-transform duration-300 hover:scale-105"
              src={product.image}
              alt={product.title}
            />
          </div>

          {/* Details Section */}
          <div className="mt-8 lg:mt-0 bg-gray-800 p-6 rounded-xl shadow-lg">
            
            {/* Title */}
            <h1 className="text-2xl font-semibold text-white">
              {product.title}
            </h1>

            {/* Price + Rating */}
            <div className="mt-4 flex items-center gap-4 flex-wrap">
              <p className="text-3xl sm:text-4xl font-bold text-white">
                ${product.price}
              </p>

              <div className="flex items-center gap-3">
                
                {/* Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className={`w-4 h-4 ${
                        index < Math.round(product.rating.rate)
                          ? "text-yellow-400"
                          : "text-gray-500"
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                  ))}
                </div>

                <p className="text-sm text-gray-300">
                  {product.rating.rate} ({product.rating.count})
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex gap-4 flex-wrap">
              <button className="px-6 py-2.5 rounded-lg bg-gray-200 hover:bg-gray-300 transition">
                ❤️ Add to favorites
              </button>

              <button className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white">
                🛒 Add to cart
              </button>
            </div>

            <hr className="my-6 border-gray-700" />

            {/* Description */}
            <p className="text-gray-400 leading-relaxed mb-4">
              {product.description}
            </p>

            <p className="text-gray-400">
              Category: <span className="capitalize">{product.category}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};