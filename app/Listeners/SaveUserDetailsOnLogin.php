<?php

namespace App\Listeners;

use App\Models\User;
use Illuminate\Auth\Events\Login;
use Illuminate\Support\Facades\Log;

class SaveUserDetailsOnLogin
{
    public function handle(Login $event)
    {
        $user = $event->user;

        // Prepare update data, only including fields if provided in the request
        $updateData = [
            'email' => $user->email ?? request('email') ?? 'no-email@example.com',
        ];

        // Only update first_name if provided in the request
        if (request()->has('first_name') || request()->has('name')) {
            $updateData['first_name'] = request('first_name') ?? request('name') ?? null;
        }

        // Only update last_name if provided in the request
        if (request()->has('last_name')) {
            $updateData['last_name'] = request('last_name') ?? null;
        }

        // Update user details
        $user->update($updateData);

        // Log successful login
        Log::info('User logged in', ['user_id' => $user->id]);
    }
}