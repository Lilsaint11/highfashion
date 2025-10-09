<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up()
    {
        // Drop any existing users_temp table and all related indexes
        Schema::dropIfExists('users_temp');
        $indexes = DB::select('SELECT name FROM sqlite_master WHERE type="index" AND name LIKE "%users_temp%"');
        foreach ($indexes as $index) {
            DB::statement("DROP INDEX IF EXISTS {$index->name}");
        }

        // Create temporary table with nullable first_name and last_name
        Schema::create('users_temp', function (Blueprint $table) {
            $table->id();
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('remember_token')->nullable();
            $table->timestamps();
        });

        // Copy data from users to users_temp
        DB::statement('
            INSERT INTO users_temp (id, first_name, last_name, email, email_verified_at, remember_token, created_at, updated_at)
            SELECT id, first_name, last_name, email, email_verified_at, remember_token, created_at, updated_at
            FROM users
        ');

        // Drop old users table and rename new one
        Schema::drop('users');
        Schema::rename('users_temp', 'users');
    }

    public function down()
    {
        // Drop any existing users_temp table and all related indexes
        Schema::dropIfExists('users_temp');
        $indexes = DB::select('SELECT name FROM sqlite_master WHERE type="index" AND name LIKE "%users_temp%"');
        foreach ($indexes as $index) {
            DB::statement("DROP INDEX IF EXISTS {$index->name}");
        }

        // Create temporary table with non-nullable first_name and last_name
        Schema::create('users_temp', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('remember_token')->nullable();
            $table->timestamps();
        });

        // Copy data back, providing defaults for null values
        DB::statement('
            INSERT INTO users_temp (id, first_name, last_name, email, email_verified_at, remember_token, created_at, updated_at)
            SELECT id,
                   COALESCE(first_name, "Unknown") AS first_name,
                   COALESCE(last_name, "User") AS last_name,
                   email,
                   email_verified_at,
                   remember_token,
                   created_at,
                   updated_at
            FROM users
        ');

        // Drop new users table and rename old one
        Schema::drop('users');
        Schema::rename('users_temp', 'users');
    }
};