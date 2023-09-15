<?php

namespace Database\Factories;

use App\Models\Book;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Edition>
 */
class EditionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'book_id' => Book::factory(),
            'format' => $this->faker->randomElement(['hardcover', 'paperback', 'ebook']),
            'description' => $this->faker->paragraph,
            'cover' => $this->faker->imageUrl(),
            'published_at' => $this->faker->year,
        ];
    }
}
