<?php

use App\Http\Controllers\AuthorController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EditionController;
use App\Http\Controllers\LibraryController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublisherController;
use App\Http\Controllers\RatingController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'verified'])->group(fn () => [
    // -- Dashboard --
    Route::group(['prefix' => 'dashboard'], function () {
        // -- Index --
        Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

        // -- Books --
        Route::group(['prefix' => 'books'] , function () {
            Route::get('/', [DashboardController::class, 'books'])->name('dashboard.books.index');
            Route::post('/', [BookController::class, 'store'])->name('dashboard.books.store')->middleware('is_admin');
            Route::delete('/{id}', [BookController::class, 'destroy'])->name('dashboard.books.destroy')->middleware('is_admin');
            Route::put('/{id}', [BookController::class, 'update'])->name('dashboard.books.update')->middleware('is_admin');

            Route::get('/{id}', [DashboardController::class, 'bookSingle'])->name('dashboard.books.single');
        });

        Route::group(['prefix' => 'editions'], function () {
            Route::post('/', [EditionController::class, 'store'])->name('dashboard.editions.store')->middleware('is_admin');
            Route::delete('/{id}', [EditionController::class, 'destroy'])->name('dashboard.editions.destroy')->middleware('is_admin');
            Route::put('/{id}', [EditionController::class, 'update'])->name('dashboard.editions.update')->middleware('is_admin');
        });

        Route::group(['prefix' => 'libraries'], function () {
            Route::post('/', [LibraryController::class, 'store'])->name('dashboard.libraries.store');
            Route::delete('/{id}', [LibraryController::class, 'destroy'])->name('dashboard.libraries.destroy');
            Route::put('/{id}', [LibraryController::class, 'update'])->name('dashboard.libraries.update');
            Route::get('/', [DashboardController::class, 'libraries'])->name('dashboard.libraries.index');
        });

        Route::group(['prefix' => 'ratings'], function () {
            Route::post('/', [RatingController::class, 'store'])->name('dashboard.ratings.store');
        });
    }),
]);

Route::get('/authors', [AuthorController::class, 'index'])->name('authors.index');
Route::get('/publishers', [PublisherController::class, 'index'])->name('publishers.index');

require __DIR__.'/auth.php';
