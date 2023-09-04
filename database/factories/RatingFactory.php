<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Rating>
 */
class RatingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'book_id' => BookFactory::new(),
            'rating' => $this->faker->numberBetween(1, 5),
            'review' => $this->faker->paragraph,
            'user_id' => UserFactory::new(),
        ];
    }
}
