<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\RatingController;

Route::group(['prefix' => 'ratings'], function () {
    Route::post('/', [RatingController::class, 'store'])->name(
        'dashboard.ratings.store',
    );
    Route::delete('/{id}', [DashboardController::class, 'destroyRating'])->name(
        'dashboard.ratings.destroy',
    );
    Route::put('/{id}', [DashboardController::class, 'updateRating'])->name(
        'dashboard.ratings.update',
    );
});
