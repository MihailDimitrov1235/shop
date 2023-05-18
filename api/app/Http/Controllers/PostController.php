<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\{
    Post,
    PostTrans
};

class PostController extends Controller
{
    public function index()
    {
        $query = Post::select(
                        'posts.id',
                        'posts.slug',
                        'posts.image_path',
                        'post_trans.title',
                        'post_trans.description',
                    )
                    ->with(['authors.author' => function ($query) {
                        $query->select(
                            'authors.id as id',
                            // 'authors.phone',
                            // 'authors.email',
                            'author_trans.name',
                        )->leftJoin('author_trans', function($q) {
                            $q->on('author_trans.author_id', 'authors.id');
                            $q->where('author_trans.lang', request()->query('lang'));
                        });
                    },
                    ])
                    ->leftJoin('post_trans', function($q) {
                        $q->on('post_trans.post_id', 'posts.id');
                        $q->where('post_trans.lang', request()->query('lang'));
                    });
        
        if(request()->query('total')) {
            $posts = $query->paginate(request()->query('total'))->withQueryString();
        }else {
            $posts = $query->paginate(10)->withQueryString();
        } 

        return $posts;
    }

    public function store(Request $request)
    {
        $post_file = $request->file('image');
        $image_path = $post_file->store('posts', 'public');

        $post = Post::create([
            'slug' => Str::slug($request->title), //title is not in request
            'image_path' => $image_path
        ]);

        foreach(json_decode($request->lang, true) as $key=>$lang) {
            PostTrans::create([
                'title' => $lang['name'],
                'description' => $lang['description'],
                'post_id' => $post->id,
                'lang' => $key
            ]);
        }

        return $post;
    }

    public function edit(Request $request, $id)
    {
        $post = Post::findById($id);
    }

    public function delete(Request $request)
    {
        $ids = $request->selected;

        Post::whereIn('id', $ids)->delete();

        return response()->json(['message' => 'Deleted'], 200);
    }

    public function getById($id)
    {

    }
}
