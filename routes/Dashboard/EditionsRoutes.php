<?php

use App\Http\Controllers\EditionController;

Route::group(['prefix' => 'editions'], function () {
    Route::post('/', [EditionController::class, 'store'])
        ->name('dashboard.editions.store')
        ->middleware('is_admin');
    Route::delete('/{id}', [EditionController::class, 'destroy'])
        ->name('dashboard.editions.destroy')
        ->middleware('is_admin');
    Route::put('/{id}', [EditionController::class, 'update'])
        ->name('dashboard.editions.update')
        ->middleware('is_admin');
});
