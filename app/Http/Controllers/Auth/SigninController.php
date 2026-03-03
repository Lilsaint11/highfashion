<?php

// namespace App\Http\Controllers\Auth;

// use App\Http\Controllers\Controller;
// use App\Models\User;
// use App\Models\LoginCode;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Auth;
// use Illuminate\Support\Facades\Mail;
// use Illuminate\Support\Str;
// use Illuminate\Http\RedirectResponse;


// class SigninController extends Controller
// {
//     // Request sign-in code (signup if user does not exist)
//     public function requestCode(Request $request)
//     {
//         $request->validate(['email' => 'required|email']);

//         // Check if user exists, otherwise create
//         $user = User::firstOrCreate(
//             ['email' => $request->email],
//             ['name' => Str::before($request->email, '@'), 'password' => bcrypt(Str::random(16))]
//         );

//         $code = rand(100000, 999999);

//         LoginCode::create([
//             'email' => $user->email,
//             'code' => $code,
//             'expires_at' => now()->addMinutes(10),
//         ]);

//         // Send code by email
//         Mail::raw("Your verification code is: $code", function ($message) use ($user) {
//             $message->to($user->email)->subject('Your sign-in code');
//         });

//         return back()->with('status', 'We emailed you a verification code.');
//     }

//     // Verify code and log user in
//     public function verifyCode(Request $request)
//     {
//         $request->validate([
//             'email' => 'required|email',
//             'code' => 'required',
//         ]);

//         $loginCode = LoginCode::where('email', $request->email)
//             ->where('code', $request->code)
//             ->where('expires_at', '>', now())
//             ->latest()
//             ->first();

//         if (! $loginCode) {
//             return back()->withErrors(['code' => 'Invalid or expired code.']);
//         }

//         $user = User::where('email', $request->email)->firstOrFail();

//         Auth::login($user);
//         $request->session()->regenerate();

//         $loginCode->delete();

//         return redirect('/orders');
//     }

//     public function signout(Request $request): RedirectResponse
//     {
//         Auth::logout();
//         $request->session()->invalidate(); 
//         $request->session()->regenerateToken(); 

//         return redirect('/signin'); 
//     }
// }


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

        return redirect('/orders');
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

        return redirect('/orders');
    }

    public function signout(Request $request): RedirectResponse
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/signin');
    }
}