<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Author;

class AuthorController extends Controller
{
    public function index()
    {
        $query = Author::select('id', 'name', 'tel', 'email');

        if(request()->query('id')) {
            $query->where('id', 'LIKE', '%'.request()->query('id').'%');
        }

        if(request()->query('name')) {
            $query->where('name', 'LIKE', '%'.request()->query('name').'%');
        }

        if(request()->query('tel')) {
            $query->where('tel', 'LIKE', '%'.request()->query('tel').'%');
        }

        if(request()->query('email')) {
            $query->where('email', 'LIKE', '%'.request()->query('email').'%');
        }

        if(request()->has(['field', 'direction'])){
            $query->orderBy(request()->query('field'), request()->query('direction'));
        }

        if(request()->query('total')) {
            $authors = $query->paginate(request()->query('total'))->withQueryString();
        }else {
            $authors = $query->paginate(10)->withQueryString();
        }

        return $authors;
    }

    public function store(Request $request)
    {
        $validator = validator($request->only('name', 'email', 'tel'), 
            [
                'name' => 'required|string',
                'email' => 'required|string|email|max:255|unique:authors',
                'tel' => 'required|string'
            ],
            [
                'email' => 'email-registered-error'
            ]
        );

        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }

        $auhtor = Author::create([
            'name' => $request->name,
            'tel' => $request->tel,
            'email' => $request->email
        ]);

        return response()->json(['auhtor' => $auhtor], 200); 
    }

    public function delete(Request $request)
    {
        $ids = $request->selected;

        Authors::whereIn('id', $ids)->delete();

        return response()->json(['message' => 'Deleted'], 200);
    }

    public function edit(Request $request, $id)
    {
        $validator = validator($request->only('name', 'email', 'tel'), 
            [
                'name' => 'required|string',
                'email' => 'required|string|email|max:255|unique:authors,email,' . $id,
                'tel' => 'required|string'
            ],
            [
                'email' => 'email-registered-error'
            ]
        );

        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }

        $author = Author::findOrFail($id);

        $author->update([
            'name' => $request->name,
            'tel' => $request->tel,
            'email' => $request->email
        ]);

        return response()->json(['category' => $author], 200); 
    }

    public function getById($id)
    {
        $author = Author::findOrFail($id);

        return $author;
    }

    public function getAll()
    {
        $authors = Author::all();

        return $authors;
    }
}
