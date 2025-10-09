<?php

namespace App\Http\Controllers;
use Inertia\Response;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Address;

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
    public function orders(){
        return Inertia::render('screens/orders');
    }

      public function profile(Request $request): Response
    {
        $addresses = Address::all()->map(function ($address) {
           
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

        $user = $request->user();

        return Inertia::render('screens/profile', [
            'user' => $user->only(['id', 'first_name','last_name', 'email']),
            'addresses' => $addresses
        ]);
    }
}
