<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Product; 
use App\Models\CartItem;

class CheckoutController extends Controller
{

public function index(Request $request)
{
    $user = $request->user();

    // Check if this is a "Buy Now" request
    if ($request->has('buy_now') && $request->filled(['product_id', 'quantity'])) {
        $product = Product::findOrFail($request->product_id);

        $checkoutItems = collect([
            (object) [
                'product' => $product,
                'quantity' => $request->quantity,
                'selected_color' => $request->selected_color,
                'selected_size' => $request->selected_size,
                'is_direct_buy' => true,
            ]
        ]);

        $total = $product->base_price * $request->quantity;
    } else {
        // Normal cart checkout
        if (!$user) {
            return redirect()->route('login'); // or show empty
        }

        $userItems = $user->cartItems()->with('product')->get();

        $checkoutItems = $userItems->map(function ($item) {
            $item->is_direct_buy = false;
            return $item;
        });

        $total = $checkoutItems->sum(fn($item) => $item->quantity * $item->product->base_price);
    }

    return Inertia::render('screens/checkout', [
        'checkoutItems' => $checkoutItems,
        'total' => $total,
        'isDirectBuy' => $request->boolean('buy_now'),
    ]);
}
}