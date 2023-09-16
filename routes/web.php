<?php

use App\Http\Controllers\AuthorController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublisherController;
use App\Http\Controllers\TagController;
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
    Route::get('/profile', [ProfileController::class, 'edit'])
        ->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])
        ->name('profile.update',);
    Route::delete('/profile', [ProfileController::class, 'destroy'])
        ->name('profile.destroy',);
});

Route::middleware(['auth', 'verified'])->group(
    fn() => [
        // -- Dashboard --
        Route::group(['prefix' => 'dashboard'], function () {
            // -- Index --
            Route::get('/', [DashboardController::class, 'index'])
                ->name('dashboard');

            // -- Books --
            Route::namespace('Book')
                ->group(__DIR__ . '/Dashboard/BooksRoutes.php');

            // -- Editions --
            Route::namespace('Edition')
                ->group(__DIR__ . '/Dashboard/EditionsRoutes.php');

            // -- Libraries --
            Route::namespace('Library')
                ->group(__DIR__ . '/Dashboard/LibrariesRoutes.php');

            // -- Ratings --
            Route::namespace('Rating')
                ->group(__DIR__ . '/Dashboard/RatingsRoutes.php');

            // -- Wishlist --
            Route::namespace('Wishlist')
                ->group(__DIR__ . '/Dashboard/WishlistRoutes.php');
        }),
    ],
);

Route::get('/authors', [AuthorController::class, 'index'])
    ->name('authors.index');

Route::get('/publishers', [PublisherController::class, 'index'])
    ->name('publishers.index');

Route::get('/tags', [TagController::class, 'index'])
    ->name('tags.index');

require __DIR__ . '/auth.php';
