<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up()
    {
        // 1. Drop temp table if it exists from previous failed runs
        Schema::dropIfExists('users_temp');

        // 2. Create temporary table with new schema (nullable first/last name)
        Schema::create('users_temp', function (Blueprint $table) {
            $table->id();
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('remember_token')->nullable();
            $table->timestamps();
            // Add other fields if needed (phone, role, etc.)
        });

        // 3. Copy data from old users table (split name safely in PHP)
        $oldUsers = DB::table('users')->get();

        foreach ($oldUsers as $user) {
            $name = trim($user->name ?? '');
            $nameParts = explode(' ', $name, 2);

            DB::table('users_temp')->insert([
                'id' => $user->id,
                'first_name' => $nameParts[0] ?? null,
                'last_name' => $nameParts[1] ?? null,
                'email' => $user->email,
                'email_verified_at' => $user->email_verified_at,
                'remember_token' => $user->remember_token,
                'created_at' => $user->created_at,
                'updated_at' => $user->updated_at,
            ]);
        }

        // 4. Drop old users table with CASCADE (removes dependent FKs)
        DB::statement('DROP TABLE users CASCADE;');

        // 5. Rename temp to users
        Schema::rename('users_temp', 'users');

        // 6. Re-create foreign keys that CASCADE dropped
        // Adjust table/column names to match your actual schema
        Schema::table('addresses', function (Blueprint $table) {
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });

        // Add more re-creations if you have other tables referencing users.id
        // Example:
        // Schema::table('orders', function (Blueprint $table) {
        //     $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        // });
    }

    public function down()
    {
        // Revert: create temp with old schema
        Schema::create('users_temp', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('remember_token')->nullable();
            $table->timestamps();
        });

        // Copy data back (combine first_name and last_name)
        $newUsers = DB::table('users')->get();

        foreach ($newUsers as $user) {
            $name = trim($user->first_name . ' ' . $user->last_name);

            DB::table('users_temp')->insert([
                'id' => $user->id,
                'name' => $name ?: 'User',
                'email' => $user->email,
                'email_verified_at' => $user->email_verified_at,
                'remember_token' => $user->remember_token,
                'created_at' => $user->created_at,
                'updated_at' => $user->updated_at,
            ]);
        }

        DB::statement('DROP TABLE users CASCADE;');
        Schema::rename('users_temp', 'users');
    }
};