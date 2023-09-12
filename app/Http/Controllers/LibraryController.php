<?php

namespace App\Http\Controllers;

use App\Models\Library;
use Illuminate\Http\Request;

class LibraryController extends Controller
{
    public function index()
    {
        return Library::where('user_id', \Auth::user()->id)->get()->load('edition.book.author', 'edition.book.publisher');
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'edition_id' => 'required|exists:editions,id',
            'user_id' => 'required|exists:users,id',
            'edition_id' => function ($attribute, $value, $fail) use ($request) {
                $library = Library::where('edition_id', $value)
                    ->where('user_id', $request->user_id)
                    ->first();

                if ($library) {
                    $fail('This edition is already in your library.');
                }
            },
        ]);

        Library::create($request->all());

        \Redirect::route('dashboard.books.index');
    }

    public function update(Request $request, $id)
    {
        $library = Library::findOrFail($id);

        $this->validate($request, [
            'edition_id' => 'required|exists:editions,id',
            'user_id' => 'required|exists:users,id',
            'notes' => 'nullable|string',
            'started_at' => 'nullable|date',
            'finished_at' => 'nullable|date',
        ]);

        $started_at = $request->started_at;
        $finished_at = $request->finished_at;

        if ($started_at && $finished_at) {
            $this->validate($request, [
                'started_at' => 'before_or_equal:finished_at',
            ]);
        }

        if (!$started_at && $finished_at) {
            $this->validate($request, [
                'started_at' => fn($attribute, $value, $fail) => $fail('You must set a start date before setting a finish date.'),
            ]);
        }

        $library->update($request->all());

        return $library;
    }
}
