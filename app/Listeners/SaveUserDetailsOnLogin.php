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

        // Update user details (nullable)
        $user->update([
            'first_name' => request('first_name') ?? request('name') ?? null,
            'last_name' => request('last_name') ?? null,
            'email' => $user->email ?? request('email') ?? 'no-email@example.com',
        ]);

        // Check if a default address exists
        $hasDefaultAddress = $user->addresses()->where('is_default', true)->exists();

        if (!$hasDefaultAddress) {
            try {
                $user->addresses()->create([
                    'country' => request('country', 'Nigeria'),
                    'first_name' => $user->first_name ?? 'Anonymous',
                    'last_name' => $user->last_name ?? 'User',
                    'address' => 'TBD',
                    'city' => 'TBD',
                    'apartment' => null,
                    'zip_code' => 'TBD',
                    'state' => 'TBD',
                    'phone' => request('phone', null),
                    'is_default' => true,
                ]);
                Log::info('Placeholder address created for user', ['user_id' => $user->id]);
            } catch (\Exception $e) {
                Log::error('Failed to create placeholder address', [
                    'user_id' => $user->id,
                    'error' => $e->getMessage(),
                ]);
            }
        } else {
            Log::info('Default address already exists, skipping creation', ['user_id' => $user->id]);
        }
    }
}