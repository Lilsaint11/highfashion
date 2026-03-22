<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\CartItem;

class CartController extends Controller
{
    public function add(Request $request)
    {
        $validated = $request->validate([
            'product_id'     => 'required|exists:products,id',
            'quantity'       => 'required|integer|min:1',
            'selected_color' => 'nullable|string|max:50',
            'selected_size'  => 'nullable|string|max:50',
        ]);

        $product = Product::find($validated['product_id']);
        $user = Auth::user();

        if ($user) {
            $cartItem = $user->cartItems()
                ->where('product_id', $product->id)
                ->where('selected_color', $validated['selected_color'])
                ->where('selected_size', $validated['selected_size'])
                ->first();

            if ($cartItem) {
                $cartItem->increment('quantity', $validated['quantity']);
            } else {
                $user->cartItems()->create([
                    'product_id'     => $product->id,
                    'quantity'       => $validated['quantity'],
                    'selected_color' => $validated['selected_color'],
                    'selected_size'  => $validated['selected_size'],
                ]);
            }
        } else {
            $cart = session()->get('cart', []);
            $key = $product->id . '_' . $validated['selected_color'] . '_' . $validated['selected_size'];

            if (isset($cart[$key])) {
                $cart[$key]['quantity'] += $validated['quantity'];
            } else {
                $cart[$key] = [
                    'product_id'     => $product->id,
                    'quantity'       => $validated['quantity'],
                    'selected_color' => $validated['selected_color'],
                    'selected_size'  => $validated['selected_size'],
                ];
            }

            session()->put('cart', $cart);
        }

        return back()->with('success', $product->name . ' added to cart!');
    }

    public function index()
    {
        $cartItems = [];
        $total = 0;

        if (Auth::check()) {
            $sessionCart = session()->get('cart', []);

            // Merge guest session cart into DB on login
            foreach ($sessionCart as $item) {
                $existing = Auth::user()->cartItems()
                    ->where('product_id', $item['product_id'])
                    ->where('selected_color', $item['selected_color'])
                    ->where('selected_size', $item['selected_size'])
                    ->first();

                if ($existing) {
                    $existing->increment('quantity', $item['quantity']);
                } else {
                    Auth::user()->cartItems()->create([
                        'product_id'     => $item['product_id'],
                        'quantity'       => $item['quantity'],
                        'selected_color' => $item['selected_color'],
                        'selected_size'  => $item['selected_size'],
                    ]);
                }
            }

            if (!empty($sessionCart)) {
                session()->forget('cart');
            }

            $cartItems = Auth::user()->cartItems()->with('product')->get();
            $total = $cartItems->sum(fn($item) => $item->quantity * $item->product->base_price);

        } else {
            $sessionCart = session()->get('cart', []);

            $cartItems = collect($sessionCart)->map(function ($item, $key) {
                $product = Product::find($item['product_id']);
                return [
                    'id'             => $key,
                    'product_id'     => $item['product_id'],
                    'product'        => $product,
                    'quantity'       => $item['quantity'],
                    'selected_color' => $item['selected_color'],
                    'selected_size'  => $item['selected_size'],
                ];
            })->values();

            $total = $cartItems->sum(fn($item) => $item['quantity'] * $item['product']->base_price);
        }

        return Inertia::render('screens/cart', [
            'cart' => [
                'items' => $cartItems,
                'total' => $total,
                'count' => is_array($cartItems) ? count($cartItems) : $cartItems->count(),
            ]
        ]);
    }

    public function updateQuantity(Request $request)
    {
        $validated = $request->validate([
            'cart_item_id' => 'required',
            'quantity'     => 'required|integer|min:1',
        ]);

        $user = Auth::user();

        if ($user) {
            $cartItem = $user->cartItems()->find($validated['cart_item_id']);
            if ($cartItem) {
                $cartItem->update(['quantity' => $validated['quantity']]);
            }
        } else {
            $cart = session()->get('cart', []);
            $key = $validated['cart_item_id']; // compound key for guests
            if (isset($cart[$key])) {
                $cart[$key]['quantity'] = $validated['quantity'];
                session()->put('cart', $cart);
            }
        }

        return back()->with('success', 'Quantity updated!');
    }

    public function remove(Request $request)
    {
        $validated = $request->validate([
            'cart_item_id' => 'required',
        ]);

        $user = Auth::user();

        if ($user) {
            $cartItem = $user->cartItems()->find($validated['cart_item_id']);
            if ($cartItem) {
                $cartItem->delete();
            }
        } else {
            $cart = session()->get('cart', []);
            unset($cart[$validated['cart_item_id']]);
            session()->put('cart', $cart);
        }

        return back()->with('success', 'Item removed from cart!');
    }
}