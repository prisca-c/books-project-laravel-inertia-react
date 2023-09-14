<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Book[]|Collection
     */
    public function index()
    {
        $books = Book::orderBy('id')->get();

        $books->load('author', 'publisher', 'editions');

        return $books;
    }

    public function show($id)
    {
        $book = Book::findOrFail($id);

        $book->load('author', 'publisher', 'editions', 'ratings');

        return $book;
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'author_id' => 'required',
            'publisher_id' => 'required',
            'published_at' => 'required|date_format:Y',
            'synopsis' => 'required',
        ]);

        $book = new Book();

        $book->title = $request->title;
        $book->author_id = $request->author_id;
        $book->publisher_id = $request->publisher_id;
        $book->synopsis = $request->synopsis;
        $book->published_at = $request->published_at;

        $book->save();

        return redirect()->route('dashboard.books.index');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required',
            'author_id' => 'required|exists:authors,id',
            'publisher_id' => 'required|exists:publishers,id',
            'published_at' => 'required|date_format:Y',
            'synopsis' => 'required',
        ]);

        $book = Book::findOrFail($id);

        $book->title = $request->title;
        $book->author_id = $request->author_id;
        $book->publisher_id = $request->publisher_id;
        $book->synopsis = $request->synopsis;
        $book->published_at = $request->published_at;

        $book->save();

        return Redirect::route('dashboard.books.index');
    }

    public function destroy(Request $request, $id)
    {
        $book = Book::findOrFail($id);

        $book->delete();

        return Redirect::route('dashboard.books.index');
    }
}
