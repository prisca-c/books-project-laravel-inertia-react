<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Author;
use App\Models\Book;
use App\Models\Edition;
use App\Models\Library;
use App\Models\Publisher;
use App\Models\Rating;
use App\Models\User;
use App\Models\Wishlist;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'username' => 'admin',
            'email' => 'admin@admin.com',
            'role_id' => 3, // 'admin'
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);

        User::factory(10)->create();

        Book::factory(10)->create();

        Book::all()->each(function ($book) {
            $book->editions()->saveMany(Edition::factory(3)->make(
                [
                    'book_id' => $book->id,
                ]
            ));
        });

        Rating::factory()->createMany([
            [
                'user_id' => 1,
                'book_id' => 1,
                'rating' => 5,
            ],
            [
                'user_id' => 2,
                'book_id' => 2,
                'rating' => 4,
            ],
            [
                'user_id' => 2,
                'book_id' => 3,
                'rating' => 3,
            ],
            [
                'user_id' => 3,
                'book_id' => 4,
                'rating' => 2,
            ],
            [
                'user_id' => 4,
                'book_id' => 5,
                'rating' => 1,
            ],
        ]);

        Library::factory()->createMany([
            [
                'user_id' => 1,
                'edition_id' => 1,
            ],
            [
                'user_id' => 2,
                'edition_id' => 2,
            ],
            [
                'user_id' => 2,
                'edition_id' => 3,
            ],
            [
                'user_id' => 3,
                'edition_id' => 4,
            ],
            [
                'user_id' => 4,
                'edition_id' => 5,
            ],
        ]);

        Wishlist::factory()->createMany([
            [
                'user_id' => 1,
                'edition_id' => 1,
            ],
            [
                'user_id' => 2,
                'edition_id' => 2,
            ],
            [
                'user_id' => 2,
                'edition_id' => 3,
            ],
            [
                'user_id' => 3,
                'edition_id' => 4,
            ],
            [
                'user_id' => 4,
                'edition_id' => 5,
            ],
        ]);
    }
}
