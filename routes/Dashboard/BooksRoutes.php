<?php
use App\Http\Controllers\BookController;
use App\Http\Controllers\DashboardController;

Route::group(['prefix' => 'books'], function () {
    Route::get('/', [DashboardController::class, 'books'])->name(
        'dashboard.books.index',
    );
    Route::post('/', [BookController::class, 'store'])
        ->name('dashboard.books.store')
        ->middleware('is_admin');
    Route::delete('/{id}', [BookController::class, 'destroy'])
        ->name('dashboard.books.destroy')
        ->middleware('is_admin');
    Route::put('/{id}', [BookController::class, 'update'])
        ->name('dashboard.books.update')
        ->middleware('is_admin');

    Route::get('/{id}', [DashboardController::class, 'bookSingle'])->name(
        'dashboard.books.single',
    );
});
