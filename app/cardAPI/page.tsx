"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ProductCards() {

type Product = {
 id: number;
 name: string;
 category?: string;
 rating?: {
    rate: number;
    count: number;
 }
 price: number;
 stock?: number;
 title: string;
 image: string;
};
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
 
    useEffect(() => {
    fetch("https://fakestoreapi.com/products") // your fake API endpoint
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        setProducts(data);
        setLoading(false);
    })
    .catch((err) => {
        console.error(err);
        setLoading(false);
    });
  }, []);
 
  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-xl text-gray-600">Loading products...</p>
    </div>
  );
 
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-red-600">
        Product Catalog
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="bg-white rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            {/* Product Image */}
            <div className="relative h-48 bg-gray-100">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain p-4"
              />
            </div>
            
            <div className="p-4">
                {/* Category */}
              <div className="mb-2">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full capitalize">
                  {product.category || "Uncategorized"}
                </span>
              </div>
              
              {/* Title */}
              <h3 className="font-semibold text-gray-800 mb-4 h-12 overflow-hidden text-sm line-clamp-2">
                {product.title}
              </h3>
              
              {/* Rating */}
              <div className="flex items-center mb-3">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < Math.floor(product.rating?.rate || 0) ? "text-yellow-400" : "text-gray-300"}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  ({product.rating?.rate.toFixed(1) || "N/A"})
                </span>
              </div>
              
              {/* Price */}
              <div>
                <span className="text-2xl font-bold text-green-600">
                  ${product.price.toFixed(2)}
                </span>
              </div>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
