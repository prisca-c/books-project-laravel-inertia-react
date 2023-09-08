<?php

namespace App\Http\Controllers;

use App\Models\Edition;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Storage;

class EditionController extends Controller
{
    public function store (Request $request)
    {
        $edition = new Edition();

        return $this->save($request, $edition);
    }

    public function update (Request $request, $id)
    {
        $edition = Edition::findOrFail($id);

        return $this->save($request, $edition);
    }

    public function destroy ($id)
    {
        $edition = Edition::findOrFail($id);

        $edition->delete();

        return Redirect::route('dashboard');
    }

    private function save(Request $request, Edition $edition): \Illuminate\Http\RedirectResponse
    {
        $request->validate([
            'book_id' => 'required|exists:books,id',
            'format' => 'required',
            'description' => 'required',
            'cover' => 'image',
            'published_at' => 'required',
        ]);

        /*
         * If the cover is being replaced, delete the old one
         * and store the new one.
         * Otherwise, keep the old one.
         */
        if ($request->hasFile('cover')) {
            $old_cover = $edition->cover;
            if ($old_cover != null && Storage::exists($old_cover))
                Storage::delete($old_cover);

            $cover_path = $request->file('cover')->store('books_cover');
        } else {
            $cover_path = $edition->cover;
        }

        $edition->format = $request->input('format');
        $edition->description = $request->input('description');
        $edition->cover = $cover_path;
        $edition->published_at = $request->input('published_at');

        $edition->save();

        return Redirect::route('dashboard');
    }
}
