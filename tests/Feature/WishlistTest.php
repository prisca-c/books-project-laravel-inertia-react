<?php

use App\Models\Edition;
use App\Models\User;
use App\Models\Wishlist;

test('can add book to wishlist', function () {
    $user = User::factory()->create();
    $edition = Edition::factory()->create();
    $wishlist = Wishlist::factory()->make([
        'edition_id' => $edition->id,
        'user_id' => $user->id,
    ]);

    $this->actingAs($user)
        ->post(route('dashboard.wishlist.store'), $wishlist->toArray())
        ->assertStatus(200);

    $wishlists = Wishlist::where('user_id', $user->id)->get();

    expect($user->wishlists()->count())->toBe(1)
        ->and($user->wishlists()->first()->toArray())->toMatchArray($wishlists->first()->toArray());
});

test('can remove book from wishlist', function () {
    $user = User::factory()->create();
    $edition = Edition::factory()->create();
    $wishlist = Wishlist::factory()->create([
        'edition_id' => $edition->id,
        'user_id' => $user->id,
    ]);

    $this->actingAs($user)
        ->delete(route('dashboard.wishlist.destroy', $wishlist->id))
        ->assertStatus(200);

    expect($user->wishlists()->count())->toBe(0);
});

test('can update book in wishlist', function () {
    $user = User::factory()->create();
    $edition = Edition::factory()->create();
    $wishlist = Wishlist::factory()->create([
        'edition_id' => $edition->id,
        'user_id' => $user->id,
    ]);

    $newEdition = Edition::factory()->create();

    $this->actingAs($user)
        ->put(route('dashboard.wishlist.update', $wishlist->id), [
            'edition_id' => $newEdition->id,
        ])
        ->assertStatus(200);

    expect($user->wishlists()->count())->toBe(1)
        ->and($user->wishlists()->first()->edition_id)->toBe($newEdition->id);
});

// TODO: Do the wishlist dashboard view index before enabling this test

//test('can get wishlist', function () {
//    $user = User::factory()->create();
//    $edition = Edition::factory()->create();
//    $wishlist = Wishlist::factory()->create([
//        'edition_id' => $edition->id,
//        'user_id' => $user->id,
//    ]);
//
//    $this->actingAs($user)
//        ->get(route('dashboard.wishlist.index'))
//        ->assertStatus(200)
//        ->assertJson([$wishlist->toArray()]);
//});
