<?php

namespace App\Http\Controllers;

use App\Models\Publisher;
use Illuminate\Http\Request;

class PublisherController extends Controller
{
    public function index()
    {
        return Publisher::all();
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string',
        ]);

        Publisher::create($request->all());
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'name' => 'required|string',
        ]);

        $publisher = Publisher::findOrFail($id);

        $publisher->update($request->all());
    }

    public function destroy(Request $request, $id)
    {
        $publisher = Publisher::findOrFail($id);

        $publisher->delete();
    }
}
