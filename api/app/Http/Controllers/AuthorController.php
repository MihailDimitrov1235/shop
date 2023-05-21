<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\{
    Author,
    AuthorTrans
};

class AuthorController extends Controller
{
    public function index()
    {
        $query = Author::select(
                            'authors.id as id',
                            'authors.phone',
                            'authors.email',
                            'authors.approved',
                            'author_trans.name',
                        )
                        ->where('authors.approved', true)
                        ->leftJoin('author_trans', function($q) {
                            $q->on('author_trans.author_id', 'authors.id');
                            $q->where('author_trans.lang', request()->query('lang'));
                        });

        if(request()->query('id')) {
            $query->where('authors.id', 'LIKE', '%'.request()->query('id').'%');
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

        $author = Author::create([
            'phone' => $request->phone,
            'email' => $request->email
        ]);

        foreach($request->lang as $key=>$lang) {

            AuthorTrans::create([
                'name' => $lang['name'],
                'author_id' => $author->id,
                'lang' => $key
            ]);
        }


        return response()->json(['author' => $author], 200); 
    }

    public function delete(Request $request)
    {
        $ids = $request->selected;

        $authors = Author::whereIn('id', $ids)->delete();

        return response()->json(['message' => 'Deleted'], 200);
    }

    public function edit(Request $request, $id)
    {
        $validator = validator($request->only('name', 'email', 'phone'), 
            [
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

        foreach($request->lang as $key=>$lang) {
            AuthorTrans::where(['author_id' => $id, 'lang' => $key])
                        ->update(['name' => $lang['name']]);
        }

        $author->update([
            'phone' => $request->phone,
            'email' => $request->email
        ]);

        return response()->json(['author' => $author], 200); 
    }

    public function getById($id)
    {
        $author = Author::with('trans')->findOrFail($id);

        return $author;
    }

    public function getAll()
    {
        $authors = Author::select(
                            'authors.id as id',
                            'authors.phone',
                            'authors.email',
                            'author_trans.name',
                        )
                        ->leftJoin('author_trans', function($q) {
                            $q->on('author_trans.author_id', 'authors.id');
                            $q->where('author_trans.lang', request()->query('lang'));
                        })
                        ->get();

        return $authors;
    }

    public function getRequests()
    {
        $query = Author::select(
                            'authors.id as id',
                            'author_trans.name',
                            'authors.created_at'
                        )
                        ->where('authors.approved', false)
                        ->leftJoin('author_trans', function($q) {
                            $q->on('author_trans.author_id', 'authors.id');
                            $q->where('author_trans.lang', request()->query('lang'));
                        });

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

    public function approve(Request $request){

        foreach($request->selected as $id){
            $author = Author::findOrFail($id);
            $author->approved = true;
            $author->update();
        }
        
        return response()->json(['message' => 'Approved'], 200);
    }
}
