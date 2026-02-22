<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up()
    {
        // Create temporary table with new schema
        Schema::create('users_temp', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('remember_token')->nullable();
            $table->timestamps();
            // Add any other fields from your original users table (e.g., phone)
        });

        // Copy data, splitting name into first_name and last_name (PostgreSQL syntax)
        DB::statement('
            INSERT INTO users_temp (id, first_name, last_name, email, email_verified_at, remember_token, created_at, updated_at)
            SELECT 
                id,
                CASE
                    WHEN name IS NOT NULL THEN COALESCE(
                        SUBSTRING(name FROM 1 FOR POSITION(\' \' IN name) - 1),
                        name
                    )
                    ELSE \'Unknown\'
                END AS first_name,
                CASE
                    WHEN name IS NOT NULL AND POSITION(\' \' IN name) > 0 THEN
                        SUBSTRING(name FROM POSITION(\' \' IN name) + 1)
                    ELSE \'User\'
                END AS last_name,
                email,
                email_verified_at,
                remember_token,
                created_at,
                updated_at
            FROM users
        ');

        // Drop old table and rename new one
        Schema::drop('users');
        Schema::rename('users_temp', 'users');
    }

    public function down()
    {
        // Create temporary table with old schema
        Schema::create('users_temp', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('remember_token')->nullable();
            $table->timestamps();
        });

        // Copy data back, combining first_name and last_name (PostgreSQL syntax)
        DB::statement('
            INSERT INTO users_temp (id, name, email, email_verified_at, remember_token, created_at, updated_at)
            SELECT 
                id,
                TRIM(COALESCE(first_name || \' \' || last_name, \'User\')) AS name,
                email,
                email_verified_at,
                remember_token,
                created_at,
                updated_at
            FROM users
        ');

        // Drop new table and rename old one
        Schema::drop('users');
        Schema::rename('users_temp', 'users');
    }
};