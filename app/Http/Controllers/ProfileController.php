<?php

namespace App\Http\Controllers;

use App\Models\Address;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\RedirectResponse;

class ProfileController extends Controller
{
    use AuthorizesRequests;
    public function addresses(Request $request): Response
    {
        $user = $request->user();
        $addresses = $user->addresses()->orderBy('is_default', 'desc')->get();

        return Inertia::render('Profile/Addresses', [
            'user' => $user->only(['id', 'name', 'email']),
            'addresses' => $addresses->map(fn ($address) => [
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
            ]),
        ]);
    }

    public function storeAddress(Request $request)
{
    $validated = $request->validate([
        'country' => 'required|string|max:100',
        'first_name' => 'required|string|max:100',
        'last_name' => 'required|string|max:100',
        'address' => 'required|string|max:255',
        'city' => 'required|string|max:100',
        'apartment' => 'nullable|string|max:100',
        'zip_code' => 'required|string|max:20',
        'state' => 'required|string|max:100',
        'phone' => 'nullable|string|max:20',
        'is_default' => 'boolean',
    ]);


    $user = $request->user();

    DB::transaction(function () use ($user, $validated) {
        if ($validated['is_default']) {
            $currentDefault = $user->addresses()->where('is_default', true)->first();
            if ($currentDefault) {
                $currentDefault->update(['is_default' => false]);
            }
        }
        $user->addresses()->create($validated);
    });

    return redirect()->route('screens.profile')->with('success', 'Address added successfully!');
}


    public function updateAddress(Request $request, Address $address)
    {
        $this->authorize('update', $address);

        $validated = $request->validate([
            'country' => 'required|string|max:100',
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:100',
            'apartment' => 'nullable|string|max:100',
            'zip_code' => 'required|string|max:20',
            'state' => 'required|string|max:100',
            'phone' => 'nullable|string|max:20',
            'is_default' => 'boolean',
        ]);

        $user = $request->user();

        DB::transaction(function () use ($user, $address, $validated) {
            // If setting this address as default and it's not already default
            if ($validated['is_default'] && !$address->is_default) {
                // Find and update the current default address to false (if exists and not this one)
                $currentDefault = $user->addresses()->where('is_default', true)->first();
                if ($currentDefault && $currentDefault->id !== $address->id) {
                    $currentDefault->update(['is_default' => false]);
                }
            }

            // Now safely update the edited address
            $address->update($validated);
        });

        return redirect()->route('screens.profile')->with('success', 'Address updated successfully!');
    }

    public function destroyAddress(Address $address): RedirectResponse
    {
        $this->authorize('delete', $address);
    
        if ($address->is_default) {
            return back()->withErrors(['delete' => 'You cannot delete your default address. Please set another address as default first.']);
        }
    
        $address->delete();
    
        // This makes Inertia do a proper GET visit to the profile page
      return Inertia::location(route('screens.profile'));
    }

public function editName(Request $request): Response
{

    if ($address->is_default) {
        return back()->withErrors(['delete' => 'You cannot delete your default address. Please set another address as default first.']);
    }
    $user = $request->user();

    return Inertia::render('Profile', [
        'user' => $user->only(['id', 'name', 'email']),
    ]);
}


    // Update the user's name
    public function updateName(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
        ]);

        $user->update([
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
        ]);

        return redirect()->route('screens.profile')->with('success', 'Name updated successfully!');
    }
}