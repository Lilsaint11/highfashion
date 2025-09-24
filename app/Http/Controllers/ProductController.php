<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function new(){
        return Inertia::render('products/new');
    }
    public function details(){
        return Inertia::render('products/details');
    }
}
