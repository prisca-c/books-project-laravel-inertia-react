<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Book;

class DashboardController extends Controller
{

    public function index()
    {
        return Inertia::render('Dashboard');
    }

    public function books()
    {
        $books = app(BookController::class)->index();

        return Inertia::render('Dashboard/Books', [
            'books' => $books,
        ]);
    }

    public function bookSingle($id)
    {
        $book = app(BookController::class)->show($id);

        return Inertia::render('Dashboard/BookSingle', [
            'book' => $book,
        ]);
    }

    public function libraries()
    {
        $libraries = app(LibraryController::class)->index();

        return Inertia::render('Dashboard/Libraries', [
            'libraries' => $libraries,
        ]);
    }
}
