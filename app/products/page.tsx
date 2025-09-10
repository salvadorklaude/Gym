// app/products/page.tsx
"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
};

export default function ProductsPage() {
  // Example products
  const productsData: Product[] = [
    { id: 1, name: "Sample Product 1", description: "This is a sample product.", price: 99.99 },
    { id: 2, name: "Sample Product 2", description: "Another sample product.", price: 149.99 },
    { id: 3, name: "Sample Product 3", description: "Yet another product.", price: 79.99 },
  ];

  const [cart, setCart] = useState<Product[]>([]);

  // Add to cart
  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  // Remove from cart
  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Total price
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <main className="flex gap-6 p-6">
      {/* Products Grid */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {productsData.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <h2 className="font-semibold">{product.name}</h2>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="mt-2 font-bold">${product.price.toFixed(2)}</p>
              <Button className="mt-4" onClick={() => addToCart(product)}>
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Cart Sidebar */}
      <div className="w-80 border-l border-gray-200 pl-4">
        <h2 className="text-xl font-bold mb-4">Shopping Cart ({cart.length})</h2>
        <div className="space-y-4">
          {cart.length === 0 && <p>Your cart is empty.</p>}
          {cart.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                <h3 className="font-semibold">{product.name}</h3>
              </CardHeader>
              <CardContent className="flex justify-between items-center">
                <p>${product.price.toFixed(2)}</p>
                <Button variant="destructive" onClick={() => removeFromCart(product.id)}>
                  Remove
                </Button>
              </CardContent>
            </Card>
          ))}

          {cart.length > 0 && (
            <>
              <Separator className="my-2" />
              <p className="font-bold text-lg">Total: ${total.toFixed(2)}</p>
              <Button className="w-full mt-2">Checkout</Button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
