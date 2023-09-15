<?php

use App\Http\Controllers\RatingController;

Route::group(['prefix' => 'ratings'], function () {
    Route::post('/', [RatingController::class, 'store'])
        ->name('dashboard.ratings.store');
    Route::delete('/{id}', [RatingController::class, 'destroy'])
        ->name('dashboard.ratings.destroy');
    Route::put('/{id}', [RatingController::class, 'update'])
        ->name('dashboard.ratings.update');
});
