<?php


namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;

class SigninController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
    
        $user = User::where('email', $request->email)->first();
    
        if (!$user || !Hash::check($request->password, $user->password)) {
            return back()->withErrors(['password' => 'Invalid email or password.']);
        }
    
        Auth::login($user);
        $request->session()->regenerate();
    
        // Merge guest session cart into DB
        $this->mergeSessionCart($user, $request);
    
        return redirect()->intended('/orders');
    }
    
    public function register(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8|confirmed',
        ]);
    
        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
    
        Auth::login($user);
        $request->session()->regenerate();
    
        // Merge guest session cart into DB
        $this->mergeSessionCart($user, $request);
    
        return redirect()->intended('/orders');
    }
    
    public function signout(Request $request): RedirectResponse
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
    
        return redirect('/signin');
    }
    
    private function mergeSessionCart($user, Request $request)
    {
        $sessionCart = $request->session()->get('cart', []);
    
        if (empty($sessionCart)) return;
    
        foreach ($sessionCart as $key => $item) {
            $existing = $user->cartItems()
                ->where('product_id', $item['product_id'])
                ->where('selected_color', $item['selected_color'])
                ->where('selected_size', $item['selected_size'])
                ->first();
    
            if ($existing) {
                $existing->increment('quantity', $item['quantity']);
            } else {
                $user->cartItems()->create([
                    'product_id'     => $item['product_id'],
                    'quantity'       => $item['quantity'],
                    'selected_color' => $item['selected_color'],
                    'selected_size'  => $item['selected_size'],
                ]);
            }
        }
    
        $request->session()->forget('cart');
    }
}