<?php

use App\Models\Book;
use App\Models\Rating;
use App\Models\User;


test('create a book rating', function () {
    $user = User::factory()->create();
    $book = Book::factory()->create();

    $response = $this
        ->actingAs($user)
        ->post('/dashboard/ratings', [
            'book_id' => $book->id,
            'rating' => 5,
        ]);

    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('dashboard.books.single', $book));

    $rating = Rating::first();

    expect($user->ratings()->count())->toBe(1)
        ->and($user->ratings()->first()->toArray())
        ->toMatchArray($rating->toArray());
});

test('update a book rating', function () {
    $user = User::factory()->create();
    $book = Book::factory()->create();
    $rating = Rating::factory()->create([
        'user_id' => $user->id,
        'book_id' => $book->id,
    ]);

    $this
        ->actingAs($user)
        ->put(route('dashboard.ratings.update', $rating->id), [
            'rating' => 1,
        ])
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('dashboard.books.single', $book));

    $rating->refresh();

    $ratings = Rating::get();

    expect($ratings)->toHaveCount(1)
        ->and($ratings->first()->toArray())->toMatchArray($rating->toArray());
});

test('delete a book rating', function () {
    $user = User::factory()->create();
    $book = Book::factory()->create();
    $rating = Rating::factory()->create([
        'user_id' => $user->id,
        'book_id' => $book->id,
    ]);

    $this
        ->actingAs($user)
        ->delete(route('dashboard.ratings.destroy', $rating->id))
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('dashboard.books.single', $book));

    $ratings = Rating::get();

    expect($ratings)->toHaveCount(0);
});

test("user can't rate a book twice", function () {
    $user = User::factory()->create();
    $book = Book::factory()->create();
    // Create the first rating
    $rating = Rating::factory()->create([
        'user_id' => $user->id,
        'book_id' => $book->id,
    ]);

    // Try to create a second rating
    $this
        ->actingAs($user)
        ->post('/dashboard/ratings', $rating->toArray())
        ->assertSessionHasErrors(['book_id']);

    $ratings = Rating::get();

    expect($ratings)->toHaveCount(1);
});
