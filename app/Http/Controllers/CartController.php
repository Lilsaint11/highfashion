<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Product; 
use App\Models\CartItem;

class CartController extends Controller
{
    public function add(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'selected_color' => 'nullable|string|max:50',
            'selected_size' => 'nullable|string|max:50',
        ]);
    
        $product = Product::find($validated['product_id']);
        $user = Auth::user(); // Assuming auth middleware is in place
    
        // Check if cart item exists
        $cartItem = $user->cartItems()->where('product_id', $product->id)->first();
    
        if ($cartItem) {
            // Update: Increment existing quantity
            $cartItem->update([
                'quantity' => \DB::raw('quantity + ' . $validated['quantity'])
            ]);
        } else {
            // Create: Set initial quantity
            $user->cartItems()->create([
                'product_id' => $product->id,
                'quantity' => $validated['quantity'],
                'selected_color' => $validated['selected_color'],
                'selected_size' => $validated['selected_size'],
            ]);
        }
    
        return back()->with('success', $product->name . ' added to cart!');
    }

    // Fetch and display cart items (for /cart page)
    public function index()
    {
        $cartItems = [];
        $total = 0;

        if (Auth::check()) {
            $cartItems = Auth::user()->cartItems()->with('product')->get();
            $total = $cartItems->sum(function ($item) {
                return $item->quantity * $item->product->price;
            });
        } else {
            $sessionCart = session('cart', []);
            $products = Product::whereIn('id', array_keys($sessionCart))->get();
            foreach ($products as $product) {
                $product->quantity = $sessionCart[$product->id];
                $total += $product->quantity * $product->price;
            }
            $cartItems = $products;
        }

        return Inertia::render('Cart/Index', [
            'cartItems' => $cartItems,
            'total' => $total,
        ]);
    }

    public function updateQuantity(Request $request)
{
    $validated = $request->validate([
        'cart_item_id' => 'required|integer',
        'quantity' => 'required|integer|min:1',
    ]);

    $user = $request->user();  // Reliable in controller

    if (!$user) {
        return back()->withErrors(['quantity' => 'You must be logged in.']);
    }

    $cartItem = $user->cartItems()->find($validated['cart_item_id']);

    if (!$cartItem) {
        return back()->withErrors(['quantity' => 'This item is not in your cart.']);
    }

    $cartItem->update(['quantity' => $validated['quantity']]);

    return back()->with('success', 'Quantity updated!');
}

    // // Update quantity
    // public function updateQuantity(Request $request)
    // {
    //     $validated = $request->validate([
    //         'product_id' => 'required|exists:products,id',
    //         'quantity' => 'required|integer|min:1',
    //     ]);

    //     if (Auth::check()) {
    //         $user = Auth::user();
    //         $cartItem = $user->cartItems()->where('product_id', $validated['product_id'])->first();
    //         if ($cartItem) {
    //             $cartItem->update(['quantity' => $validated['quantity']]);
    //         }
    //     } else {
    //         $cart = session('cart', []);
    //         if (isset($cart[$validated['product_id']])) {
    //             $cart[$validated['product_id']] = $validated['quantity'];
    //             session(['cart' => $cart]);
    //         }
    //     }

    //     return back()->with('success', 'Quantity updated!');
    // }

 
    public function remove(Request $request)
    {
        $validated = $request->validate([
            'cart_item_id' => 'required|integer',
        ]);
    
        $user = $request->user();  // ← Use this instead of auth()->user()
    
        if (!$user) {
            return back()->withErrors(['cart_item_id' => 'You must be logged in.']);
        }
    
        $cartItem = $user->cartItems()->find($validated['cart_item_id']);
    
        if (!$cartItem) {
            return back()->withErrors(['cart_item_id' => 'This item is not in your cart or does not exist.']);
        }
    
        $cartItem->delete();
    
        return back()->with('success', 'Item removed from cart!');
    }

    // // Bonus: View cart method (for /cart page)
    // public function index()
    // {
    //     $cartItems = [];
    //     if (Auth::check()) {
    //         $cartItems = Auth::user()->cartItems()->with('product')->get();
    //     } else {
    //         $sessionCart = session('cart', []);
    //         $cartItems = Product::whereIn('id', array_keys($sessionCart))->get()->map(function ($product) use ($sessionCart) {
    //             $product->quantity = $sessionCart[$product->id];
    //             return $product;
    //         });
    //     }

    //     return Inertia::render('Cart/Index', ['cartItems' => $cartItems]);
    // }
}