"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  const [userName, setUserName] = useState<string | null>(null);

  // Check if user is logged in
  useEffect(() => {
    const userData = localStorage.getItem("currentUser");
    if (userData) {
      const user = JSON.parse(userData);
      setUserName(user.name);
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUserName(null);
  };

  const products = [
    { id: 1, name: "Gym T-Shirt", price: "₱799", image: "/images/gym-shirt.jpg" },
    { id: 2, name: "Protein Shaker", price: "₱399", image: "/images/shaker.jpg" },
    { id: 3, name: "Whey Protein Pack", price: "₱2,499", image: "/images/whey.jpg" },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 bg-gray-900 shadow-md">
        <h1 className="text-2xl font-extrabold tracking-widest text-red-500">
          PowerHouse Gym
        </h1>
        <div className="flex items-center gap-2">
          {!userName ? (
            <Link href="/login">
              <Button variant="default" className="bg-red-600 hover:bg-red-700">
                Sign In
              </Button>
            </Link>
          ) : (
            <Button
              variant="destructive"
              className="bg-red-600 hover:bg-red-700"
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 bg-gradient-to-b from-gray-900 to-black">
        {userName ? (
          <h2 className="text-5xl font-extrabold mb-6 text-red-500">
            Welcome back, {userName}!
          </h2>
        ) : (
          <>
            <h2 className="text-5xl font-extrabold mb-6">
              Train Hard. <span className="text-red-500">Look Strong.</span>
            </h2>
            <p className="text-lg max-w-2xl text-gray-300 mb-8">
              Join PowerHouse Gym and fuel your workouts with the best gear and
              supplements.
            </p>
            <Link href="/login">
              <Button className="bg-red-600 hover:bg-red-700 text-lg px-6 py-3">
                Get Started
              </Button>
            </Link>
          </>
        )}
      </section>

      {/* Products */}
      <section className="flex-1 px-8 py-16">
        <h3 className="text-3xl font-bold mb-8 text-center">Our Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="w-full h-64 relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 flex flex-col gap-2">
                <h4 className="text-xl font-semibold">{product.name}</h4>
                <p className="text-red-400 font-bold">{product.price}</p>
                <p className="text-gray-300 text-sm">Buy in store</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
