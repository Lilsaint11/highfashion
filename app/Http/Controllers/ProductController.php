<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;  // Import the correct Response class from Inertia

class ProductController extends Controller
{
    public function new(): Response {
        $products = Product::all()->map(function ($product) {
            $images = is_array($product->images) ? $product->images : json_decode($product->images, true) ?? [];
            return [
                'id' => $product->id,
                'name' => $product->name,
                'brand' => $product->brand,
                'base_price' => $product->base_price,
                'colors' => $product->colors,
                'sizes' => $product->sizes,
                'quantity' => $product->quantity,
                'main_image' => $images[0] ?? '/images/hf11.webp',
                'left_third_image' => $images[1] ?? null,
                'middle_third_image' => $images[2] ?? null,
                'right_third_image' => $images[3] ?? null,
            ];
        });

        return Inertia::render('products/new', [
            'products' => $products,  // Pass the products data to the frontend component
        ]);
    }

    public function details($product): Response
    {
        $product = Product::findOrFail($product); // Fetch by id
        $images = is_array($product->images) ? $product->images : json_decode($product->images, true) ?? [];
        return Inertia::render('products/details', [
            'product' => [
                'id' => $product->id,
                'name' => $product->name,
                'price' => $product->base_price,
                'colors' => is_array($product->colors) ? $product->colors : json_decode($product->colors, true) ?? [],
                'sizes' => is_array($product->sizes) ? $product->sizes : json_decode($product->sizes, true) ?? [],
                'quantity' => $product->quantity,
                'images' => is_array($product->images) ? $product->images : json_decode($product->images, true) ?? [],
                // 'main_image' => $images[0] ?? '/images/hf11.webp',
                // 'left_third_image' => $images[1] ?? null,
                // 'middle_third_image' => $images[2] ?? null,
                // 'right_third_image' => $images[3] ?? null
            ],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('products/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'base_price' => 'required|numeric|min:0',
            'colors' => 'required|array|min:1',
            'sizes' => 'required|array|min:1',
            'quantity' => 'required|integer|min:0',
            'images' => 'required|array|min:1',
        ]);

        Product::create([
            'name' => $validated['name'],
            'base_price' => $validated['base_price'],
            'colors' => json_encode($validated['colors']),
            'sizes' => json_encode($validated['sizes']),
            'quantity' => $validated['quantity'],
            'images' => json_encode($validated['images']),
        ]);

        return redirect()->route('collections.new')->with('success', 'Product created successfully!');
    }
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return redirect()->route('collections.new')->with('success', 'Product deleted successfully!');
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'base_price' => 'required|numeric|min:0',
            'colors' => 'required|array|min:1',
            'sizes' => 'required|array|min:1',
            'quantity' => 'required|integer|min:0',
            // 'main_image' => 'required|string|min:1',
            // 'left_third_image' => 'required|string|min:1',
            // 'middle_third_image' => 'required|string|min:1',
            // 'right_third_image' => 'required|string|min:1',
            'images' => 'required|array|min:1'
        ]);

        $product->update([
            'name' => $validated['name'],
            'base_price' => $validated['base_price'],
            'colors' => json_encode($validated['colors']),
            'sizes' => json_encode($validated['sizes']),
            'quantity' => $validated['quantity'],
            // 'main_image' => 'required|string|min:1',
            // 'left_third_image' => 'required|string|min:1',
            // 'middle_third_image' => 'required|string|min:1',
            // 'right_third_image' => 'required|string|min:1',
            'images' => json_encode($validated['images'])
        ]);

        return redirect()->route('collections.new', $product->id)->with('success', 'Product updated successfully!');
    }
}