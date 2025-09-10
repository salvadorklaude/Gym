"use client";

import { useState } from "react";
import { Dumbbell, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import CategoriesPage from "@/app/admin/categories/page";

export default function AdminDashboardPage() {
  const [active, setActive] = useState("categories");

  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-2xl font-extrabold text-red-500">
            Admin Panel
          </h2>
          <p className="text-xs text-gray-400 mt-1">PowerHouse Gym</p>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-2">
          <Button
            variant={active === "categories" ? "default" : "ghost"}
            className={`w-full justify-start ${
              active === "categories"
                ? "bg-red-600 hover:bg-red-700"
                : "text-gray-300 hover:text-white"
            }`}
            onClick={() => setActive("categories")}
          >
            <Dumbbell className="h-5 w-5 mr-2" />
            Categories
          </Button>

          <Button
            variant={active === "products" ? "default" : "ghost"}
            className={`w-full justify-start ${
              active === "products"
                ? "bg-red-600 hover:bg-red-700"
                : "text-gray-300 hover:text-white"
            }`}
            onClick={() => setActive("products")}
          >
            <Package className="h-5 w-5 mr-2" />
            Products
          </Button>
        </nav>

        <div className="p-4 border-t border-gray-800 text-sm text-gray-400">
          © {new Date().getFullYear()} PowerHouse Gym
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 bg-gray-950">
        {active === "categories" && <CategoriesPage />}
      </main>
    </div>
  );
}
