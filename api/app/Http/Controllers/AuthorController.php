<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Author;

class AuthorController extends Controller
{
    public function index()
    {
        $query = Author::select('id', 'name', 'phone', 'email');

        if(request()->query('id')) {
            $query->where('id', 'LIKE', '%'.request()->query('id').'%');
        }

        if(request()->query('name')) {
            $query->where('name', 'LIKE', '%'.request()->query('name').'%');
        }

        if(request()->query('phone')) {
            $query->where('phone', 'LIKE', '%'.request()->query('phone').'%');
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
        $validator = validator($request->only('name', 'email', 'phone'), 
            [
                'name' => 'required|string',
                'email' => 'required|string|email|max:255|unique:authors',
                'phone' => 'required|string'
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
            'phone' => $request->phone,
            'email' => $request->email
        ]);

        return response()->json(['auhtor' => $auhtor], 200); 
    }

    public function delete(Request $request)
    {
        $ids = $request->selected;

        Author::whereIn('id', $ids)->delete();

        return response()->json(['message' => 'Deleted'], 200);
    }

    public function edit(Request $request, $id)
    {
        $validator = validator($request->only('name', 'email', 'phone'), 
            [
                'name' => 'required|string',
                'email' => 'required|string|email|max:255|unique:authors,email,' . $id,
                'phone' => 'required|string'
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
            'phone' => $request->phone,
            'email' => $request->email
        ]);

        return response()->json(['author' => $author], 200); 
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
