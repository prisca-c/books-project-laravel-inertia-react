<?php

namespace App\Http\Controllers;

use App\Models\Author;
use Illuminate\Http\Request;

class AuthorController extends Controller
{
    public function index()
    {
        return Author::all();
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string',
            'biography' => 'nullable|string',
        ]);

        Author::create($request->all());
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'name' => 'required|string',
            'biography' => 'nullable|string',
        ]);

        $author = Author::findOrFail($id);

        $author->update($request->all());
    }

    public function destroy(Request $request, $id)
    {
        $author = Author::findOrFail($id);

        $author->delete();
    }
}
