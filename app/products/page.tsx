"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  status: "active" | "inactive";
  image?: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    category: "",
    status: "active" as "active" | "inactive",
    image: null as File | null,
  });

  // ✅ Load products from backend
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error loading products:", err));
  }, []);

  // ✅ Add product with FormData
  const addProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("price", newProduct.price.toString());
      formData.append("category", newProduct.category);
      formData.append("status", newProduct.status);
      if (newProduct.image) {
        formData.append("image", newProduct.image);
      }

      const res = await fetch("http://127.0.0.1:8000/api/products", {
        method: "POST",
        body: formData, // ✅ send as multipart/form-data
      });

      if (!res.ok) throw new Error("Failed to add product");

      const data = await res.json();
      setProducts([...products, data]); // update list
      setNewProduct({ name: "", price: 0, category: "", status: "active", image: null });
    } catch (err) {
      console.error(err);
      alert("Error adding product!");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add Product</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
          </div>
          <div>
            <Label>Price</Label>
            <Input
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
            />
          </div>
          <div>
            <Label>Category</Label>
            <Input
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            />
          </div>
          <div>
            <Label>Product Image</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.files ? e.target.files[0] : null })
              }
            />
          </div>
          <Button onClick={addProduct}>Add Product</Button>
        </CardContent>
      </Card>

      {/* Product List */}
      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Image</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>${p.price}</TableCell>
                  <TableCell>{p.category}</TableCell>
                  <TableCell>{p.status}</TableCell>
                  <TableCell>
                    {p.image ? (
                      <img
                        src={`http://127.0.0.1:8000/storage/${p.image}`}
                        alt={p.name}
                        className="h-12 w-12 object-cover rounded"
                      />
                    ) : (
                      "—"
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
