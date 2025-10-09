<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('addresses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); 
            $table->string('country')->nullable();; 
            $table->string('first_name')->nullable();;
            $table->string('last_name')->nullable();;
            $table->string('address'); 
            $table->string('city')->nullable();; 
            $table->string('apartment')->nullable();; 
            $table->string('zip_code')->nullable();; 
            $table->string('state')->nullable();; 
            $table->string('phone')->nullable(); 
            $table->boolean('is_default')->default(false); 
            $table->timestamps();
        });

        // Ensure only one default address per user
        Schema::table('addresses', function (Blueprint $table) {
            $table->unique(['user_id', 'is_default']); 
        });
    }

    public function down()
    {
        Schema::dropIfExists('addresses');
    }
};  