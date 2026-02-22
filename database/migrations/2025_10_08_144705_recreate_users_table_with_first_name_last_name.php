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
        });

        // Copy data (PostgreSQL syntax)
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

        // Drop old users table with CASCADE (drops dependent FKs)
        Schema::dropIfExists('users'); // or DB::statement('DROP TABLE users CASCADE;');

        // Rename temp to users
        Schema::rename('users_temp', 'users');

        // Re-create foreign keys that were dropped by CASCADE
        // Adjust table/column names to match your actual schema
        Schema::table('addresses', function (Blueprint $table) {
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });

        // Add any other dropped FKs here (orders.user_id, payments.user_id, etc.)
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

        // Copy data back (PostgreSQL syntax)
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

        // Drop new table
        Schema::drop('users');

        // Rename temp to users
        Schema::rename('users_temp', 'users');
    }
};