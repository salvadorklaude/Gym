"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import CategoriesPage from "@/app/admin/categories/page";
import ProductsPage from "../products/page";

export default function AdminDashboardPage() {
  const [active, setActive] = useState("categories");

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-4">
        <h2 className="text-lg font-bold mb-6">Admin Dashboard</h2>

        <div className="flex flex-col gap-2">
          <Button
            variant={active === "categories" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActive("categories")}
          >
            Categories
          </Button>
          <Button
            variant={active === "products" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActive("products")}
          >
            Products
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-50">
        {active === "categories" && <CategoriesPage />}
        {active === "products" && <ProductsPage />}
      </main>
    </div>
  );
}
