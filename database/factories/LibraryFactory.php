<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\Library>
 */
class LibraryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'notes' => $this->faker->paragraph,
            'edition_id' => EditionFactory::new(),
            'user_id' => UserFactory::new(),
        ];
    }
}
