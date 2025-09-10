"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, Edit2, Trash2 } from "lucide-react";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  isActive: boolean;
  image?: string;
  createdAt: string;
};

type ProductFormData = {
  name: string;
  description: string;
  price: string;
  category: string;
  stock: string;
  isActive: boolean;
  image?: string;
};

const categories = ["Supplements", "Gym Gear", "Apparel", "Accessories", "Others"];

export default function AdminProductsPage() {
  const initialProducts: Product[] = [
    { id: 1, name: "Whey Protein Pack", description: "High-quality whey protein for muscle growth.", price: 49.99, category: "Supplements", stock: 15, isActive: true, createdAt: "2024-01-15", image: "https://images.unsplash.com/photo-1579722821273-0f6c4f2f0a72?w=300&h=300&fit=crop&crop=center" },
    { id: 2, name: "Gym T-Shirt", description: "Breathable gym t-shirt designed for comfort.", price: 19.99, category: "Apparel", stock: 30, isActive: true, createdAt: "2024-02-10", image: "https://images.unsplash.com/photo-1598971639058-3f6f8cbb62e3?w=300&h=300&fit=crop&crop=center" },
    { id: 3, name: "Protein Shaker", description: "Leak-proof protein shaker with 700ml capacity.", price: 12.99, category: "Accessories", stock: 0, isActive: false, createdAt: "2024-03-05", image: "https://images.unsplash.com/photo-1612152602835-04ec5f634fc7?w=300&h=300&fit=crop&crop=center" },
  ];

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [nextId, setNextId] = useState(4);
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    isActive: true,
    image: ""
  });

  const resetForm = () => {
    setFormData({ name: "", description: "", price: "", category: "", stock: "", isActive: true, image: "" });
    setEditingProduct(null);
  };

  const handleInputChange = (field: keyof ProductFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => handleInputChange("image", event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleCreateProduct = () => {
    if (!formData.name.trim() || !formData.description.trim() || !formData.category.trim()) {
      alert("Name, Description, and Category are required!");
      return;
    }

    const newProduct: Product = {
      id: nextId,
      name: formData.name.trim(),
      description: formData.description.trim(),
      price: parseFloat(formData.price) || 0,
      category: formData.category,
      stock: parseInt(formData.stock) || 0,
      isActive: formData.isActive,
      createdAt: new Date().toISOString().split("T")[0],
      image: formData.image || undefined,
    };

    setProducts(prev => [...prev, newProduct]);
    setNextId(prev => prev + 1);
    setIsDialogOpen(false);
    resetForm();
  };

  const handleUpdateProduct = () => {
    if (!editingProduct) return;

    const updatedProduct: Product = {
      ...editingProduct,
      name: formData.name.trim(),
      description: formData.description.trim(),
      price: parseFloat(formData.price) || 0,
      category: formData.category,
      stock: parseInt(formData.stock) || 0,
      isActive: formData.isActive,
      image: formData.image || undefined
    };

    setProducts(prev => prev.map(p => p.id === editingProduct.id ? updatedProduct : p));
    setIsDialogOpen(false);
    resetForm();
  };

  const handleDeleteProduct = (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      stock: product.stock.toString(),
      isActive: product.isActive,
      image: product.image || ""
    });
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  return (
    <div className="bg-gradient-to-b from-[#0a0a0a] to-[#111] min-h-screen p-8 text-white">
      <h1 className="text-4xl font-extrabold uppercase text-center mb-8">
        <span className="text-white">Manage </span>
        <span className="text-red-600">Products</span>
      </h1>

      <div className="flex justify-end mb-6">
        <Button className="bg-red-600 hover:bg-red-700" onClick={openCreateDialog}>
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map(product => (
          <Card key={product.id} className="bg-[#1a1a1a] border border-gray-800 hover:border-red-600 shadow-lg">
            <CardHeader className="text-lg font-bold text-red-500">{product.name}</CardHeader>
            <CardContent>
              {product.image && <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded mb-3" />}
              <p className="text-gray-300 text-sm mb-2">{product.description}</p>
              <p className="font-bold text-white mb-1">${product.price.toFixed(2)}</p>
              <p className="text-sm text-gray-400 mb-2">Category: {product.category}</p>
              <Badge className={product.stock > 0 ? "bg-green-600" : "bg-red-700"}>
                {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
              </Badge>
              <div className="flex justify-between mt-4">
                <Button size="sm" variant="outline" onClick={() => openEditDialog(product)}>
                  <Edit2 className="h-4 w-4 mr-1" /> Edit
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDeleteProduct(product.id)}>
                  <Trash2 className="h-4 w-4 mr-1" /> Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[#1a1a1a] border border-gray-700 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-red-500">{editingProduct ? "Edit Product" : "Add Product"}</DialogTitle>
            <DialogDescription className="text-gray-400">Fill in the details below.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <Label>Name</Label>
              <Input value={formData.name} onChange={e => handleInputChange("name", e.target.value)} className="bg-[#111] text-white border-gray-700" />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea value={formData.description} onChange={e => handleInputChange("description", e.target.value)} className="bg-[#111] text-white border-gray-700" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label>Price</Label>
                <Input type="number" value={formData.price} onChange={e => handleInputChange("price", e.target.value)} className="bg-[#111] text-white border-gray-700" />
              </div>
              <div>
                <Label>Stock</Label>
                <Input type="number" value={formData.stock} onChange={e => handleInputChange("stock", e.target.value)} className="bg-[#111] text-white border-gray-700" />
              </div>
            </div>
            <div>
              <Label>Category</Label>
              <Select value={formData.category} onValueChange={value => handleInputChange("category", value)}>
                <SelectTrigger className="bg-[#111] text-white border-gray-700"><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] text-white border-gray-700">
                  {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={formData.isActive} onCheckedChange={checked => handleInputChange("isActive", checked)} />
              <Label>Active</Label>
            </div>
            <div>
              <Label>Image</Label>
              <Input type="file" accept="image/*" onChange={handleImageUpload} className="bg-[#111] text-white border-gray-700" />
              {formData.image && <img src={formData.image} alt="Preview" className="w-32 h-32 mt-2 object-cover rounded" />}
            </div>
          </div>

          <DialogFooter>
            <Button className="bg-red-600 hover:bg-red-700" onClick={editingProduct ? handleUpdateProduct : handleCreateProduct}>
              {editingProduct ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
