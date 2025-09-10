"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ProductForm() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category_id: "",
    image: null,
  });

  useEffect(() => {
    fetch("/api/categories")
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const fd = new FormData();
    for (const key in form) {
      fd.append(key, (form as any)[key]);
    }
    await fetch("/api/products", { method: "POST", body: fd });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input placeholder="Product Name" onChange={e => setForm({...form, name: e.target.value})} />
      <Input placeholder="Description" onChange={e => setForm({...form, description: e.target.value})} />
      <Input placeholder="Price" type="number" onChange={e => setForm({...form, price: e.target.value})} />
      <Select onValueChange={(v) => setForm({...form, category_id: v})}>
        <SelectTrigger>
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((c: any) => (
            <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <input type="file" onChange={(e) => setForm({...form, image: e.target.files?.[0]})} />
      <Button type="submit">Create Product</Button>
    </form>
  );
}
