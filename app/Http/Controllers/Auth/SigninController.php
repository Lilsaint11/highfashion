<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\LoginCode;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class SigninController extends Controller
{
    // Request sign-in code (signup if user does not exist)
    public function requestCode(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        // Check if user exists, otherwise create
        $user = User::firstOrCreate(
            ['email' => $request->email],
            ['name' => Str::before($request->email, '@'), 'password' => bcrypt(Str::random(16))]
        );

        $code = rand(100000, 999999);

        LoginCode::create([
            'email' => $user->email,
            'code' => $code,
            'expires_at' => now()->addMinutes(10),
        ]);

        // Send code by email
        Mail::raw("Your verification code is: $code", function ($message) use ($user) {
            $message->to($user->email)->subject('Your sign-in code');
        });

        return back()->with('status', 'We emailed you a verification code.');
    }

    // Verify code and log user in
    public function verifyCode(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'code' => 'required',
        ]);

        $loginCode = LoginCode::where('email', $request->email)
            ->where('code', $request->code)
            ->where('expires_at', '>', now())
            ->latest()
            ->first();

        if (! $loginCode) {
            return back()->withErrors(['code' => 'Invalid or expired code.']);
        }

        $user = User::where('email', $request->email)->firstOrFail();

        Auth::login($user);
        $request->session()->regenerate();

        // cleanup code after use
        $loginCode->delete();

        return redirect('/');
    }
}
