<?php

namespace App\Http\Controllers;
use Inertia\Response;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Address;
use App\Models\User;
use App\Models\Product;

class ScreensController extends Controller
{
    public function contact(){
        return Inertia::render('screens/contact');
    }
    public function about(){
        return Inertia::render('screens/about');
    }
    public function faq(){
        return Inertia::render('screens/faq');
    }
    public function cart(){
        return Inertia::render('screens/cart');
    }
    public function checkout(){
        return Inertia::render('screens/checkout');
    }
    public function signin(){
      
        return Inertia::render('screens/signin');
    }
    public function orders(Request $request){
        $user = $request->user();

        return Inertia::render('screens/orders', [
            'user' => $user->only(['id', 'first_name','last_name', 'email']),
        ]);
    }
    public function index(): Response {
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

        return Inertia::render('index', [
            'products' => $products,  // Pass the products data to the frontend component
        ]);
    }
      public function profile(Request $request): Response
    {
        $user = $request->user();
        $addresses = $user->addresses()->get()->map(function ($address) {
            return [
                'id' => $address->id,
                'country' => $address->country,
                'first_name' => $address->first_name,
                'last_name' => $address->last_name,
                'address' => $address->address,
                'city' => $address->city,
                'apartment' => $address->apartment,
                'zip_code' => $address->zip_code,
                'state' => $address->state,
                'phone' => $address->phone,
                'is_default' => $address->is_default,
                'user'=> $address->user_id
            ];
        });
        $users = User::all()->map(function ($users) {
           
            return [
                'id' => $users->id,
                'first_name' => $users->first_name,
                'last_name' => $users->last_name,
                'email'=> $users->email
            ];
        });

        $user = $request->user();

        return Inertia::render('screens/profile', [
            'user' => $user->only(['id', 'first_name','last_name', 'email']),
            'addresses' => $addresses,
            'users' => $users
        ]);
    }
}
