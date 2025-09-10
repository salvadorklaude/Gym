"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Category = {
  id?: number;
  name?: string; // optional to avoid undefined error
};

type CategoryFormProps = {
  category?: Category; // optional
  onClose: () => void;
  onSaved: () => void;
};

export default function CategoryForm({ category, onClose, onSaved }: CategoryFormProps) {
  const [name, setName] = useState(category?.name || "");

  const handleSubmit = async () => {
    const url = category?.id ? `/api/categories/${category.id}` : "/api/categories";
    const method = category?.id ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    onSaved();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold">{category?.id ? "Edit Category" : "Add Category"}</h2>

        <Input placeholder="Category Name" value={name} onChange={e => setName(e.target.value)} />

        <div className="flex justify-end gap-2">
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </div>
      </div>
    </div>
  );
}
