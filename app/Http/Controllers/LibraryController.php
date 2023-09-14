<?php

namespace App\Http\Controllers;

use App\Models\Library;
use App\Models\User;
use Illuminate\Database\Query\Builder;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class LibraryController extends Controller
{
    public function index()
    {
        $user = \Auth::user();
        $libraries = Library::where('user_id', $user->id)
            ->orderBy('created_at')
            ->with('edition.book.author', 'edition.book.publisher')
            ->get();

        $user_ratings = \Auth::user()
            ->ratings()
            ->get();

        foreach ($libraries as $library) {
            $library->rating = $user_ratings
                ->where('book_id', $library->edition->book->id)
                ->first();
        }

        return $libraries;
    }

    public function store(Request $request)
    {
        $rules = [
            'user_id' => 'required|exists:users,id',
            'edition_id' => [
                'required',
                'exists:editions,id',
                Rule::unique('libraries')
                    ->where(fn (Builder $query) => $query
                        ->where('user_id', $request->user_id)
                        ->where('deleted_at', null)
                    ),
            ]
        ];

        $customMessages = [
            'edition_id.unique' => 'This edition is already in your library.',
        ];

        $this->validate($request, $rules, $customMessages);

        Library::create($request->all());

        return \Redirect::route('dashboard.libraries.index');
    }

    public function update(Request $request, $id)
    {
        $library = Library::findOrFail($id);
        $user = \Auth::user();

        $rules = [
            'edition_id' => [
                'required',
                'exists:editions,id',
                Rule::prohibitedIf(fn() => $user->id != $library->user_id) ?? $user->role_id != 3
            ],
            'notes' => 'nullable|string',
            'started_at' => 'nullable|date',
            'finished_at' => 'nullable|date',
        ];

        $this->validate($request, $rules);

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
