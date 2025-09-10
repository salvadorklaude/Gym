"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import CategoriesPage from "@/app/admin/categories/page";
import ProductsPage from "../products/page";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminDashboardPage() {
  const [active, setActive] = useState("categories");
  const router = useRouter();

  // 🔹 Logout handler
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token"); // token from login
      if (!token) {
        router.push("/login"); // if no token, just redirect
        return;
      }

      await fetch("http://127.0.0.1:8000/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      // Clear token and redirect to login
      localStorage.removeItem("token");
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col justify-between">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-8">🛠 Admin Panel</h2>

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
        </div>

        {/* Logout button at bottom */}
        <div className="p-4 border-t">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
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
