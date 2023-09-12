<?php

use App\Models\Book;
use App\Models\User;

test('user without admin role cannot interract with unauthorized book routes', function () {
    $user = User::factory()->create(['role_id' => 1]);
    $book = Book::factory()->create([])->toArray();

    $this
        ->actingAs($user)
        ->post(route('dashboard.books.store'), $book)
        ->assertStatus(302)
        ->assertRedirect(route('dashboard'));

    $this
        ->actingAs($user)
        ->put(route('dashboard.books.update', $book['id']), ['title' => 'New Title'])
        ->assertStatus(302)
        ->assertRedirect(route('dashboard'));

    $this
        ->actingAs($user)
        ->delete(route('dashboard.books.destroy', $book['id']))
        ->assertStatus(302)
        ->assertRedirect(route('dashboard'));

    $books = Book::get();

    expect($books)->toHaveCount(1) // The book created by the factory
        ->and($books->first()->toArray())->toMatchArray($book);
});

test('admin can create a book', function () {
    $user = User::factory()->create(['role_id' => 3]);
    $form = Book::factory()->make([])->toArray();

    $this
        ->actingAs($user)
        ->post(route('dashboard.books.store'), $form)
        ->assertStatus(302)
        ->assertRedirect(route('dashboard.books.index'));

    $books = Book::get();

    expect($books)->toHaveCount(1)
        ->and($books->first()->toArray())->toMatchArray($form);
});

test('admin update a book', function () {
    $user = User::factory()->create(['role_id' => 3]);
    $book = Book::factory()->create([]);
    $secondBook = Book::factory()->create([])->toArray();

    $this
        ->actingAs($user)
        ->put(route('dashboard.books.update', $book->id), $secondBook)
        ->assertStatus(302)
        ->assertRedirect(route('dashboard.books.index'));

    $books = Book::get();

    expect($books)->toHaveCount(2)
        ->and($books->first()->toArray())->toMatchArray($secondBook);
});

test('admin can delete a book', function () {
    $user = User::factory()->create(['role_id' => 3]);
    $book = Book::factory()->create([]);

    $this
        ->actingAs($user)
        ->delete(route('dashboard.books.destroy', $book->id))
        ->assertStatus(302)
        ->assertRedirect(route('dashboard.books.index'));

    $books = Book::get();

    expect($books)->toHaveCount(0);
});
