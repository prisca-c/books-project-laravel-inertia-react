<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Wishlist;
use Illuminate\Validation\Rule;

class WishlistController extends Controller
{

    /*
     * Notes: Since there's is no view for the wishlist, we do not redirect to a view
     * when the user interacts with the wishlist.
     * View TODO
     * */
    public function index()
    {
        $user  = \Auth::user();
        return Wishlist::where('user_id', $user->id)->get();
    }

    public function store(Request $request)
    {
        $user  = \Auth::user();
        $rules = [
            'edition_id' => [
                'required',
                'exists:editions,id',
                Rule::unique('wishlists')->where(function ($query) use ($user) {
                    return $query->where('user_id', $user->id);
                }),
            ],
        ];

        $customMessages = [
            'edition_id.unique' => 'This book is already in your wishlist.',
        ];

        $this->validate($request, $rules, $customMessages);

        $user->wishlists()->create($request->all());
    }

    public function update(Request $request, $id)
    {
        $wishlist = Wishlist::findOrFail($id);
        $user = \Auth::user();

        $rules = [
            'edition_id' => [
                'required',
                'exists:editions,id',
                Rule::unique('wishlists')->where(function ($query) use ($user) {
                    return $query->where('user_id', $user->id);
                }),
            ],
        ];

        $customMessages = [
            'edition_id.unique' => 'This book is already in your wishlist.',
        ];

        $this->validate($request, $rules, $customMessages);

        $wishlist->update($request->all());

        return $wishlist;
    }

    public function destroy(Request $request, $id)
    {
        $wishlist = Wishlist::findOrFail($id);
        $wishlist->delete();

        return $wishlist;
    }
}
