<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Post;

class PostController extends Controller
{
    public function index()
    {

    }

    public function store(Request $request)
    {
        Post::create([
            'title' => $request->input('title'),
            'subtitle' => $request->input('subtitle'),
            'slug' => Str::slug($request->title),
            //'image_path' => $newImageName
        ]);
    }

    public function edit(Request $request, $id)
    {

    }

    public function delete()
    {

    }

    public function getById($id)
    {

    }
}
