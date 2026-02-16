<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use App\Models\CartItem;
use App\Models\Product;

class HandleInertiaRequests extends Middleware
{
    // ... other code ...

    public function share(Request $request): array
{

    $shared = parent::share($request);

    $cartData = [
        'items' => [],
        'count' => 0,
        'total' => 0.0,
    ];

    // return array_merge($shared, [
    //     'auth' => [
    //         'user' => $request->user(),
    //     ],
    //     'cart' => $cartData,
    // ]);
    
        // USE $request->user() — this is always reliable in Inertia middleware
        $user = $request->user();
    
        if ($user) {
            $userItems = $user->cartItems()->with('product')->get();
    
            $cartData['items'] = $userItems->map(function ($item) {
                return [
                    'id' => $item->id,
                    'product' => $item->product,
                    'quantity' => $item->quantity,
                    'selected_color' => $item->selected_color,
                    'selected_size' => $item->selected_size,
                ];
            })->toArray();
    
            $cartData['count'] = $userItems->sum('quantity');
            $cartData['total'] = $userItems->sum(fn($item) => $item->quantity * $item->product->base_price);
        }
    
        return array_merge($shared, [
            'cart' => $cartData,
        ]);
}
}