<?php

use App\Models\Book;
use App\Models\Edition;
use App\Models\User;

test('admin create a book with his edition', function () {
    $user = User::factory()->create(['role_id' => 3]);
    $bookForm = Book::factory()->create([]);
    $edition = Edition::factory()->make([
        'book_id' => $bookForm->id,
        'cover' => 'https://via.placeholder.com/640x480.png/000077?text=perspiciatis',
    ]);

    $this
        ->actingAs($user)
        ->post(route('dashboard.editions.store'), $edition->toArray())
        ->assertStatus(302)
        ->assertRedirect(route('dashboard.books.single', $bookForm['id']));

    $bookEditions = Book::first()->load('editions')->editions;
    $editions = Edition::get();

    expect($editions)->toHaveCount(1)
        ->and($bookEditions)->toHaveCount(1)
        ->and($editions->first()->toArray())->toMatchArray($bookEditions->first()->toArray());
});

test('admin update a book with his edition', function () {
    $user = User::factory()->create(['role_id' => 3]);
    $book = Book::factory()->create([]);
    $edition = Edition::factory()->create([
        'book_id' => $book->id,
        'cover' => 'https://via.placeholder.com/640x480.png/000077?text=perspiciatis',
    ]);
    $secondEdition = Edition::factory()->make([
        'book_id' => $book->id,
        'cover' => 'https://via.placeholder.com/640x480.png/000077?text=perspiciatis',
    ]);

    $this
        ->actingAs($user)
        ->put(route('dashboard.editions.update', $edition->id), $secondEdition->toArray())
        ->assertStatus(302)
        ->assertRedirect(route('dashboard.books.single', $book->id));

    $bookEditions = Book::first()->load('editions')->editions;
    $editions = Edition::get();

    expect($editions)->toHaveCount(1)
        ->and($bookEditions)->toHaveCount(1)
        // expect the first edition to be the same as the book's edition
        ->and($editions->first()->toArray())->toMatchArray($bookEditions->first()->toArray())
        // expect the second edition to be the same as the edition updated
        ->and($editions->first()->toArray())->toMatchArray($secondEdition->toArray());
});

test('admin delete a book with his edition', function () {
    $user = User::factory()->create(['role_id' => 3]);
    $book = Book::factory()->create([]);
    $edition = Edition::factory()->create([
        'book_id' => $book->id,
        'cover' => 'https://via.placeholder.com/640x480.png/000077?text=perspiciatis',
    ]);

    $this
        ->actingAs($user)
        ->delete(route('dashboard.editions.destroy', $edition->id))
        ->assertStatus(302)
        ->assertRedirect(route('dashboard.books.single', $book->id));

    $book = Book::get();
    $bookEditions = $book->first()->load('editions')->editions;
    $editions = Edition::get();

    expect($editions)->toHaveCount(0)
        ->and($book)->toHaveCount(1)
        ->and($bookEditions)->toHaveCount(0);
});
