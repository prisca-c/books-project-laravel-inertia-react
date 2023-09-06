<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookController extends Controller
{
    public function index()
    {
        $books = Book::all();

        $books->load('author', 'publisher');

        $books->each(function ($book) {
            if ($book->editions->count() > 0) {
                $book->cover = $book->editions->first()->cover;
            } else {
                $book->cover = 'https://via.placeholder.com/150';
            }
        });

        return $books;
    }

    public function show(Book $book)
    {
        $book->load('author', 'publisher', 'editions');

        $book->editions->each(function ($edition) {
            $edition->library_count = $edition->libraries->count();
        });

        return Inertia::render('Books', [
            'book' => $book,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'author_id' => 'required',
            'publisher_id' => 'required',
            'published_at' => 'required|date_format:Y',
        ]);

        $book =  new Book();

        $book->title = $request->title;
        $book->author_id = $request->author_id;
        $book->publisher_id = $request->publisher_id;
        $book->synopsis = $request->synopsis;
        $book->published_at = $request->published_at;

        $book->save();

        return redirect()->route('dashboard.books.index');
    }

    public function update(Request $request, Book $book)
    {
        $request->validate([
            'title' => 'required',
            'author_id' => 'required',
            'publisher_id' => 'required',
            'published_at' => 'required|date_format:Y',
            'synopsis' => 'required',
        ]);

        $book->title = $request->title;
        $book->author_id = $request->author_id;
        $book->publisher_id = $request->publisher_id;
        $book->synopsis = $request->synopsis;
        $book->published_at = $request->published_at;

        return redirect()->route('dashboard.books.index');
    }

    public function destroy(Book $book)
    {
        $book->delete();

        return redirect()->route('dashboard.books.index');
    }
}
