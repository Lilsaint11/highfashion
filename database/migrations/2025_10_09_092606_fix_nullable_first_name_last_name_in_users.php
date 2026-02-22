<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up()
    {
        // Drop temp table if exists
        Schema::dropIfExists('users_temp');

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

        // Copy data
        DB::statement('
            INSERT INTO users_temp (id, first_name, last_name, email, email_verified_at, remember_token, created_at, updated_at)
            SELECT id, first_name, last_name, email, email_verified_at, remember_token, created_at, updated_at
            FROM users
        ');

        Schema::drop('users');
        Schema::rename('users_temp', 'users');
    }

    public function down()
    {
        Schema::dropIfExists('users_temp');

        Schema::create('users_temp', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('remember_token')->nullable();
            $table->timestamps();
        });

        DB::statement('
            INSERT INTO users_temp (id, first_name, last_name, email, email_verified_at, remember_token, created_at, updated_at)
            SELECT id,
                   COALESCE(first_name, \'Unknown\'),
                   COALESCE(last_name, \'User\'),
                   email,
                   email_verified_at,
                   remember_token,
                   created_at,
                   updated_at
            FROM users
        ');

        Schema::drop('users');
        Schema::rename('users_temp', 'users');
    }
};