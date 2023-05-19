<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\{
    Post,
    PostTrans,
    PostCategory
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
                    ->with([
                        'categories' => function ($query) {
                            $query->select(
                                'post_categories.category_id',
                                'post_categories.post_id',
                                'category_trans.name'
                            )
                            ->leftJoin('category_trans', function($q) {
                                $q->on('category_trans.category_id', 'post_categories.category_id');
                                $q->where('category_trans.lang', request()->query('lang'));
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
            'slug' => Str::slug(json_decode($request->lang, true)['en']['title']),
            'image_path' => $image_path,
            'blogger_id' => $request->blogger_id,
            'visits' => 0,
        ]);

        foreach(json_decode($request->lang, true) as $key=>$lang) {
            PostTrans::create([
                'title' => $lang['title'],
                'description' => $lang['description'],
                'content' => $lang['content'],
                'post_id' => $post->id,
                'lang' => $key,
            ]);
        }

        foreach(json_decode($request->categories, true) as $category) {
            PostCategory::create([
                'post_id' => $post->id,
                'category_id' => $category['value']
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

    public function incrementVisits($id){
        $post = Post::findOrFail($id); 
        $post->visits = ($post->visits + 1);
        $post->update();
        return $post->visits;
    }

    public function getById(Request $request, $id)
    {
        $query = Post::select(
            'posts.id',
            'posts.slug',
            'posts.image_path',
            'posts.visits',
            'posts.blogger_id',
            'post_trans.title',
            'post_trans.description',
            'post_trans.content'
        )
        ->with([
            'categories' => function ($query) {
                $query->select(
                    'post_categories.category_id',
                    'post_categories.post_id',
                    'category_trans.name'
                )
                ->leftJoin('category_trans', function($q) {
                    $q->on('category_trans.category_id', 'post_categories.category_id');
                    $q->where('category_trans.lang', request()->query('lang'));
                });
            },
            'blogger' => function ($query) {
                $query->select(
                    'bloggers.id as id',
                    'bloggers.phone',
                    'bloggers.email',
                    'bloggers.links',
                    'bloggers.image_path',
                    'blogger_trans.name',
                )->leftJoin('blogger_trans', function($q) {
                    $q->on('blogger_trans.blogger_id', 'bloggers.id');
                    $q->where('blogger_trans.lang', request()->query('lang'));
                });
            },
        ])
        ->leftJoin('post_trans', function($q) {
            $q->on('post_trans.post_id', 'posts.id');
            $q->where('post_trans.lang', request()->query('lang'));
        });

        return $query->get();
    }
}
