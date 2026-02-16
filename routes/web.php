<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ScreensController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use Illuminate\Support\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Auth\SigninController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CheckoutController;


Route::get('/', [ScreensController::class,'index'])->name('index');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('/products/create', [ProductController::class, 'create'])->name('products.create');
    Route::post('/products', [ProductController::class, 'store'])->name('products.store');
    
    Route::delete('/products/{id}', [ProductController::class, 'destroy'])->name('products.destroy');
    Route::get('/profile', [ScreensController::class,'profile'])->name('screens.profile');
    Route::post('/signout', [SigninController::class, 'signout'])->name('signout');
    Route::get('/profile/addresses', [ProfileController::class, 'addresses'])->name('profile.addresses');
    Route::post('/profile', [ProfileController::class, 'storeAddress'])->name('profile.addresses.store');
    Route::put('/profile/{address}', [ProfileController::class, 'updateAddress'])->name('profile.addresses.update');
    Route::delete('/profile/{address}', [ProfileController::class, 'destroyAddress'])
    ->name('profile.addresses.destroy');
    Route::post('/cart/add', [CartController::class, 'add'])->name('cart.add');
    Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
    Route::post('/cart/update-quantity', [CartController::class, 'updateQuantity'])->name('cart.updateQuantity');
    Route::delete('/cart/remove', [CartController::class, 'remove'])->name('cart.remove');
    Route::put('/profile', [ProfileController::class, 'updateName'])->name('profile.updateName');
    Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout');
});

Route::put('/products/{id}', [ProductController::class, 'update'])->name('products.update');
Route::middleware('guest')->group(function () {
    Route::get('/signin', [ScreensController::class,'signin'])->name('login');

});
Route::get('/screens/contact', [ScreensController::class,'contact'])->name('screens.contact');
Route::get('/screens/about', [ScreensController::class,'about'])->name('screens.about');
Route::get('/screens/faq', [ScreensController::class,'faq'])->name('screens.faq');
Route::get('/cart', [ScreensController::class,'cart'])->name('screens.cart');
// Route::get('/checkout', [ScreensController::class,'checkout'])->name('screens.checkout');
Route::get('/orders', [ScreensController::class,'orders'])->name('screens.orders');
Route::get('/collections/new-in', [ProductController::class,'new'])->name('collections.new');
Route::get('/products/{product}', [ProductController::class,'details'])->name('products.details');
Route::post('/signin/request', [SigninController::class, 'requestCode']);
Route::post('/signin/verify', [SigninController::class, 'verifyCode']);


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
