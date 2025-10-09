<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'base_price',
        'colors',
        'sizes',
        'quantity',
        'images',
    ];

    protected $casts = [
        'base_price' => 'decimal:2',
        'colors' => 'array',
        'sizes' => 'array',
        'images' => 'array',
    ];
}