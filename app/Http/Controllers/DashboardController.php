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
        $books = (new BookController())->index();

        return Inertia::render('Dashboard/DashboardBooks', [
            'books' => $books,
        ]);
    }

    public function bookSingle($id)
    {
        $book = (new BookController())->show($id);

        return Inertia::render('Dashboard/DashboardBookSingle', [
            'book' => $book,
        ]);
    }
}
