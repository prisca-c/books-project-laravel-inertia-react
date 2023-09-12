<?php

namespace App\Http\Controllers;

use App\Models\Library;
use App\Models\User;
use Illuminate\Http\Request;

class LibraryController extends Controller
{
    public function index()
    {
        return Library::where('user_id', \Auth::user()->id)
            ->with('edition.book.author', 'edition.book.publisher')
            ->get();
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'user_id' => 'required|exists:users,id',
            'edition_id' => [
                'required',
                'exists:editions,id',
                function ($attribute, $value, $fail) {
                    $library = Library::where('edition_id', $value)
                        ->where('user_id', request()->user_id)
                        ->first();

                    if ($library) {
                        $fail('This edition is already in your library.');
                    }
                }
            ]
        ]);

        Library::create($request->all());

        return \Redirect::route('dashboard.books.index');
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

        return \Redirect::route('dashboard.libraries.index');
    }

    public function destroy($id)
    {
        $library = Library::findOrFail($id);

        $library->delete();

        return \Redirect::route('dashboard.libraries.index');
    }
}
