<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LibraryController;

Route::group(['prefix' => 'libraries'], function () {
    Route::post('/', [LibraryController::class, 'store'])->name(
        'dashboard.libraries.store',
    );
    Route::delete('/{id}', [LibraryController::class, 'destroy'])->name(
        'dashboard.libraries.destroy',
    );
    Route::put('/{id}', [LibraryController::class, 'update'])->name(
        'dashboard.libraries.update',
    );
    Route::get('/', [DashboardController::class, 'libraries'])->name(
        'dashboard.libraries.index',
    );
});
