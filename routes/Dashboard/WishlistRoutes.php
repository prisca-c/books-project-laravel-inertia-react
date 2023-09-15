<?php
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\WishlistController;

Route::group(['prefix' => 'wishlist'], function () {
// No view for now
//    Route::get('/', [DashboardController::class, 'wishlist'])->name(
//        'dashboard.wishlist.index',
//    );
    Route::post('/', [WishlistController::class, 'store'])
        ->name('dashboard.wishlist.store');
    Route::delete('/{id}', [WishlistController::class, 'destroy'])
        ->name('dashboard.wishlist.destroy');
    Route::put('/{id}', [WishlistController::class, 'update'])
        ->name('dashboard.wishlist.update');
});
