"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type Product = {
  id: number;
  name: string;
  description?: string;
  price: number;
};

export default function CartPage() {
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  const removeFromCart = (id: number) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  if (cart.length === 0) {
    return <p className="p-6">Your cart is empty.</p>;
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

      <div className="space-y-4">
        {cart.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <h2 className="font-semibold">{product.name}</h2>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <p>${product.price.toFixed(2)}</p>
              <Button variant="destructive" onClick={() => removeFromCart(product.id)}>
                Remove
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator className="my-4" />
      <p className="font-bold text-lg">Total: ${total.toFixed(2)}</p>
    </main>
  );
}
