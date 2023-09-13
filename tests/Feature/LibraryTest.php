<?php

use App\Models\Book;
use App\Models\Edition;
use App\Models\Library;
use App\Models\User;

test('user add book to his library', function () {
    $user = User::factory()->create();
    $book = Book::factory()->create();
    $edition = Edition::factory()->create([
        'book_id' => $book->id,
    ]);
    $library = Library::factory()->make([
        'user_id' => $user->id,
        'edition_id' => $edition->id,
    ]);

    $this
        ->actingAs($user)
        ->post(route('dashboard.libraries.store'), $library->toArray())
        ->assertStatus(302)
        ->assertRedirect(route('dashboard.libraries.index'));

    $libraries = Library::get();

    expect($libraries)->toHaveCount(1)
        ->and($libraries->first()->toArray())->toMatchArray($library->toArray());
});

test("Cannot add the same book's edition twice", function () {
    $user = User::factory()->create();
    $book = Book::factory()->create();
    $edition = Edition::factory()->create([
        'book_id' => $book->id,
    ]);
    $library = Library::factory()->make([
        'user_id' => $user->id,
        'edition_id' => $edition->id,
    ]);

    $this
        ->actingAs($user)
        ->post(route('dashboard.libraries.store'), $library->toArray())
        ->assertStatus(302)
        ->assertRedirect(route('dashboard.libraries.index'));

    $libraries = Library::get();

    expect($libraries)->toHaveCount(1)
        ->and($libraries->first()->toArray())->toMatchArray($library->toArray());

    $this
        ->actingAs($user)
        ->post(route('dashboard.libraries.store'), $library->toArray())
        ->assertStatus(302)
        ->assertRedirect('/');

    $libraries = Library::get();

    expect($libraries)->toHaveCount(1)
        ->and($libraries->first()->toArray())->toMatchArray($library->toArray());
});

test('user update book in his library', function () {
    $user = User::factory()->create();
    $book = Book::factory()->create();
    $edition = Edition::factory()->create([
        'book_id' => $book->id,
    ]);
    $library = Library::factory()->create([
        'user_id' => $user->id,
        'edition_id' => $edition->id,
    ]);
    $secondLibrary = Library::factory()->make([
        'user_id' => $user->id,
        'edition_id' => $edition->id,
        'notes' => \Faker\Factory::create()->sentence,
    ]);

    $this
        ->actingAs($user)
        ->put(route('dashboard.libraries.update', $library->id), $secondLibrary->toArray())
        ->assertStatus(302)
        ->assertRedirect(route('dashboard.libraries.index'));

    $libraries = Library::get();

    expect($libraries)->toHaveCount(1)
        ->and($libraries->first()->toArray())->toMatchArray($secondLibrary->toArray());
});

test("simple user can't update a library that does not belong to him", function () {
    $user = User::factory()->create(['role_id' => 1]);
    $libraryUser = User::factory()->create();
    $book = Book::factory()->create();
    $edition = Edition::factory()->create([
        'book_id' => $book->id,
    ]);
    $library = Library::factory()->create([
        'user_id' => $libraryUser->id,
        'edition_id' => $edition->id,
    ]);
    $secondLibrary = Library::factory()->make([
        'user_id' => $libraryUser->id,
        'edition_id' => $edition->id,
        'notes' => \Faker\Factory::create()->sentence,
    ]);

    $this
        ->actingAs($user)
        ->put(route('dashboard.libraries.update', $library->id), $secondLibrary->toArray())
        ->assertStatus(302)
        ->assertRedirect('/');

    $libraries = Library::get();

    expect($libraries)->toHaveCount(1)
        ->and($libraries->first()->user_id)->not()->toEqual($user->id)
        ->and($libraries->first()->toArray())->not()->toMatchArray($secondLibrary->toArray());
});

test('user delete book from his library', function () {
    $user = User::factory()->create();
    $book = Book::factory()->create();
    $edition = Edition::factory()->create([
        'book_id' => $book->id,
    ]);
    $library = Library::factory()->create([
        'user_id' => $user->id,
        'edition_id' => $edition->id,
    ]);

    $this
        ->actingAs($user)
        ->delete(route('dashboard.libraries.destroy', $library->id))
        ->assertStatus(302)
        ->assertRedirect(route('dashboard.libraries.index'));

    $libraries = Library::get();

    expect($libraries)->toHaveCount(0);
});
