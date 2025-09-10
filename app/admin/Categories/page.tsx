"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CategoryForm from "@/app/admin/Categories/CategoriesForm";

type Category = {
  id: number;
  name: string;
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  async function fetchCategories() {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    await fetch(`/api/categories/${id}`, { method: "DELETE" });
    setCategories(categories.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Categories</h1>

      <Button onClick={() => setEditingCategory({} as Category)}>Add Category</Button>

      {editingCategory && (
        <CategoryForm
          category={editingCategory}
          onClose={() => setEditingCategory(null)}
          onSaved={fetchCategories}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {categories.map(category => (
          <Card key={category.id}>
            <CardHeader>{category.name}</CardHeader>
            <CardContent>
              <div className="flex gap-2 mt-4">
                <Button onClick={() => setEditingCategory(category)}>Edit</Button>
                <Button variant="destructive" onClick={() => handleDelete(category.id)}>
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
