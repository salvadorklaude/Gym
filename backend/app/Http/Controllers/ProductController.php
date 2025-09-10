<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    // Store a new product
    public function store(Request $request)
    {
        // Validate input
        $validated = $request->validate([
            'name' => 'required|string',
            'price' => 'required|numeric',
            'category' => 'required|string',
            'status' => 'required|string|in:active,inactive',
            'image' => 'nullable|image|max:2048', // 2MB max
        ]);

        // Create new product
        $product = new Product();
        $product->name = $validated['name'];
        $product->price = $validated['price'];
        $product->category = $validated['category'];
        $product->status = $validated['status'];

        // ✅ Handle file upload
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $product->image = $path;
        }

        $product->save();

        return response()->json($product, 201);
    }
}
