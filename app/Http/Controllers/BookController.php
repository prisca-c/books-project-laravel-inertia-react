<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use LaravelIdea\Helper\App\Models\_IH_Book_C;

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

        $books->load('author', 'publisher', 'editions', 'tags');

        return $books;
    }

    public function show($id)
    {
        $book = Book::findOrFail($id);

        $book->load([
            'author',
            'publisher',
            'editions',
            'tags',
            'ratings' => fn($query) => $query->withUsername()
        ]);

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
            'tags' => 'nullable|array|exists:tags,id',
        ]);

        $book = new Book();

        $this->save($request, $book);

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
            'tags' => 'nullable|array|exists:tags,id',
        ]);

        $book = Book::findOrFail($id);

        $this->save($request, $book);

        return Redirect::route('dashboard.books.index');
    }

    public function destroy(Request $request, $id)
    {
        $book = Book::findOrFail($id);

        $book->delete();

        return Redirect::route('dashboard.books.index');
    }

    /**
     * @param Request $request
     * @param array|Book|_IH_Book_C $book
     * @return void
     */
    private function save(Request $request, array|Book|_IH_Book_C $book): void
    {
        $book->title = $request->title;
        $book->author_id = $request->author_id;
        $book->publisher_id = $request->publisher_id;
        $book->synopsis = $request->synopsis;
        $book->published_at = $request->published_at;

        $book->save();

        $book->tags()->sync($request->tags);
    }
}
