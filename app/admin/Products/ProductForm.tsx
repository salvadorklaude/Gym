"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type Category = {
  id: number;
  name: string;
};

export type Product = {
  id?: number;
  name: string;
  description: string;
  price: number;
  image?: string | null;
  categories: Category[];
};

type ProductFormProps = {
  product?: Product;
  onSave: (product: Product) => void;
  onClose?: () => void;
};

export default function ProductForm({ product, onSave, onClose }: ProductFormProps) {
  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price || 0);
  const [image, setImage] = useState<File | null>(null);
  const [categories, setCategories] = useState<Category[]>(product?.categories || []);
  const [allCategories, setAllCategories] = useState<Category[]>([]);

  // Simulate fetching categories
  useEffect(() => {
    // Replace with API fetch if needed
    setAllCategories([
      { id: 1, name: "Electronics" },
      { id: 2, name: "Clothing" },
      { id: 3, name: "Books" },
    ]);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: product?.id,
      name,
      description,
      price,
      image: image ? URL.createObjectURL(image) : product?.image || null,
      categories,
    });
    if (onClose) onClose();
  };

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-bold">{product ? "Edit Product" : "Add Product"}</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
          />
          <div>
            <label className="block font-semibold mb-1">Product Image</label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
            />
            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="mt-2 h-24 w-24 object-cover border rounded"
              />
            )}
            {!image && product?.image && (
              <img
                src={product.image}
                alt="Product"
                className="mt-2 h-24 w-24 object-cover border rounded"
              />
            )}
          </div>

          <div className="space-y-2">
            <label className="font-semibold block">Categories</label>
            <div className="flex flex-wrap gap-2">
              {allCategories.map((cat) => (
                <label key={cat.id} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={categories.some((c) => c.id === cat.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCategories([...categories, cat]);
                      } else {
                        setCategories(categories.filter((c) => c.id !== cat.id));
                      }
                    }}
                  />
                  {cat.name}
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <Button type="submit">{product ? "Update" : "Save"}</Button>
            {onClose && (
              <Button type="button" variant="destructive" onClick={onClose}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
