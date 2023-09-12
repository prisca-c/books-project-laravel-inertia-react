<?php


use App\Models\Book;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('authenticated users can access the dashboard', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->get('/dashboard')
        ->assertStatus(200)
        ->assertInertia(fn (Assert $page) => $page
            ->component('Dashboard')
        );

    $response->assertOk();
});

test('dashboard books can be accessed', function () {
    $user = User::factory()->create();
    $this
        ->actingAs($user)
        ->get(route('dashboard.books.index'))
        ->assertStatus(200)
        ->assertInertia(fn (Assert $page) => $page
            ->component('Dashboard/Books')
            ->has('books', Book::count())
        );
});

test("single book's page can be accessed", function () {
    $user = User::factory()->create();
    $book = Book::factory()->create();

    $this
        ->actingAs($user)
        ->get(route('dashboard.books.single', $book->id))
        ->assertStatus(200)
        ->assertInertia(fn (Assert $page) => $page
            ->component('Dashboard/BookSingle')
            ->has('book')
        );
});
