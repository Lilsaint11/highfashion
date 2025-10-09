<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = $this->faker->unique()->sentence(3); // e.g., "Awesome Hoodie Top"
        $slug = Str::slug($name); // Generate slug from name

        return [
            'name' => $name,
            'base_price' => $this->faker->randomFloat(2, 10000, 500000), // Random price between ₦10,000 and ₦500,000
            'colors' => json_encode($this->faker->randomElements(['BLACK', 'GREY', 'WHITE', 'BLUE', 'RED'], rand(1, 3))), // JSON array of 1-3 colors
            'sizes' => json_encode(['S', 'M', 'L', 'XL', '2XL', '3XL']), // Fixed sizes as JSON
            'quantity' => $this->faker->numberBetween(1, 50), // Random stock 1-50
            'images' => json_encode([
                '/images/' . $this->faker->word() . '.webp', // e.g., "/images/hf41.webp"
                '/images/' . $this->faker->word() . '-angle.webp',
            ]), // JSON array of 2 images
        ];
    }
}