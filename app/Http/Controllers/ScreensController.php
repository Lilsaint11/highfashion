<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

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
}
