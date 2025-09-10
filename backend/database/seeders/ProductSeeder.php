<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        Product::create([
            'name' => 'Sample Product 1',
            'description' => 'This is a sample product.',
            'price' => 99.99,
        ]);

        Product::create([
            'name' => 'Sample Product 2',
            'description' => 'Another sample product.',
            'price' => 149.99,
        ]);
    }
}
