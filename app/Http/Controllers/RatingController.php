<?php

namespace App\Http\Controllers;

use Illuminate\Database\Query\Builder;
use Illuminate\Http\Request;
use App\Models\Rating;
use Illuminate\Validation\Rule;

class RatingController extends Controller
{
    public function store(Request $request)
    {
        $user = \Auth::user();
        $rules = [
            'book_id' => [
                'required',
                'exists:books,id',
                Rule::unique('ratings')->where(
                    fn(Builder $query) => $query
                        ->where('user_id', $user->id)
                        ->where('deleted_at', null),
                ),
            ],
            'rating' => 'required|integer|min:1|max:5',
            'review' => 'nullable|string',
        ];

        $customMessages = [
            'book_id.unique' => 'You have already rated this book.',
        ];

        $this->validate($request, $rules, $customMessages);

        \Auth::user()
            ->ratings()
            ->create([
                'rating' => $request->rating,
                'book_id' => $request->book_id,
                'review' => $request->review,
            ]);

        return \Redirect::route('dashboard.books.single', $request->book_id);
    }

    public function update(Request $request, $id)
    {
        $rating = Rating::findOrFail($id);
        $user = \Auth::user();

        $rules = [
            'rating' => [
                'required',
                'integer',
                'min:1',
                'max:5',
                Rule::prohibitedIf(fn() => $user->id != $rating->user_id) ??
                $user->role_id != 3,
            ],
            'review' => 'nullable|string',
        ];

        $customMessages = [
            'rating.prohibited_if' =>
                'You are not allowed to edit this rating.',
        ];

        $this->validate($request, $rules, $customMessages);

        $rating->update([
            'rating' => $request->rating,
            'review' => $request->review,
        ]);

        return redirect(route('dashboard.books.single', $rating->book_id));
    }

    public function destroy($id)
    {
        $rating = Rating::findOrFail($id);
        $user = \Auth::user();

        if ($user->id != $rating->user_id ?? $user->role_id != 3) {
            return redirect()
                ->back()
                ->withErrors(['You are not allowed to delete this rating.']);
        }

        $rating->delete();

        return redirect(route('dashboard.books.single', $rating->book_id));
    }
}
