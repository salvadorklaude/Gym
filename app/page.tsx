"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
};

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <main className="space-y-10 p-6">
      {/* Hero Section */}
      <section className="text-center py-16 bg-blue-100 rounded-lg">
        <h1 className="text-4xl font-bold mb-4">Welcome to Mini Store</h1>
        <p className="text-lg mb-6">
          Discover our products and shop with ease!
        </p>
        <Link href="/products" className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600">
          View Products
        </Link>
      </section>

      {/* Products Preview */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.slice(0, 6).map((product) => (
            <div key={product.id} className="border p-4 rounded">
              {product.image && (
                <img src={product.image} alt={product.name} className="h-40 w-full object-cover mb-2 rounded" />
              )}
              <h3 className="font-semibold">{product.name}</h3>
              <p>${product.price}</p>
            </div>
          ))}
        </div>
        {products.length > 6 && (
          <div className="mt-4 text-center">
            <Link href="/products" className="text-blue-500 hover:underline">
              View All Products
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
