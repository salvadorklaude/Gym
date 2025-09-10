"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProductForm, { Product as ProductType } from "./ProductForm";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [editingProduct, setEditingProduct] = useState<ProductType | null>(null);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("auth_token"); // fetch token
      const res = await fetch("/api/products", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Failed to load products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const token = localStorage.getItem("auth_token");
      await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      setProducts(products.filter(p => p.id !== id));
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Admin Products</h1>

      <Button onClick={() =>
        setEditingProduct({ id: 0, name: "", description: "", price: 0, image: "", categories: [] })
      }>Add Product</Button>

      {editingProduct && (
        <ProductForm
          product={editingProduct}
          onSave={() => { setEditingProduct(null); fetchProducts(); }}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {products.map(product => (
          <Card key={product.id}>
            <CardHeader>{product.name}</CardHeader>
            <CardContent>
              <p>{product.description}</p>
              <p className="font-bold mt-2">${product.price}</p>
              <div className="flex gap-2 mt-4">
                <Button onClick={() => setEditingProduct(product)}>Edit</Button>
                <Button
  variant="destructive"
  onClick={() => product.id !== undefined && handleDelete(product.id)}
>
  Delete
</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
