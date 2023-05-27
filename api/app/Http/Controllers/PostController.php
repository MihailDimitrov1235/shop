<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use App\Models\{
    Post,
    PostTrans,
    PostCategory,
    PostVisits
};

class PostController extends Controller
{
    public function index()
    {
        $query = Post::select(
                        'posts.id',
                        'posts.slug',
                        'posts.image_path',
                        'posts.created_at',
                        'post_trans.title',
                        'post_trans.subtitle',
                        'posts.blogger_id'
                    )
                    ->where('approved', true)
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
                                'bloggers.id',
                                'bloggers.image_path',
                                'blogger_trans.name'
                            )
                            ->leftJoin('blogger_trans', function($q) {
                                $q->on('blogger_trans.blogger_id', 'bloggers.id');
                                $q->where('blogger_trans.lang', request()->query('lang'));
                            });;
                        }
                    ])
                    ->leftJoin('post_trans', function($q) {
                        $q->on('post_trans.post_id', 'posts.id');
                        $q->where('post_trans.lang', request()->query('lang'));
                    });

        if(request()->query('id')) {
            $query->where('posts.id', 'LIKE', '%'.request()->query('id').'%');
        }

        if(request()->query('slug')) {
            $query->where('slug', 'LIKE', '%'.request()->query('slug').'%');
        }

        if(request()->query('title')) {
            $query->where('title', 'LIKE', '%'.request()->query('title').'%');
        }

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
        $image_path = $post_file[0]->store('posts', 'public');

        $post = Post::create([
            'slug' => Str::slug(json_decode($request->lang, true)['en']['title']),
            'image_path' => $image_path,
            'blogger_id' => $request->blogger_id,
        ]);


        foreach(json_decode($request->lang, true) as $key=>$lang) {
            PostTrans::create([
                'title' => $lang['title'],
                'subtitle' => $lang['subtitle'],
                'content' => $lang['content'],
                'post_id' => $post->id,
                'lang' => $key,
            ]);
        }

        foreach(json_decode($request->category, true) as $category) {
            PostCategory::create([
                'post_id' => $post->id,
                'category_id' => $category['value']
            ]);
        }

        return $post;
    }

    public function edit(Request $request, $id)
    {
        $post = Post::findOrFail($id);
        $post->slug = Str::slug(json_decode($request->lang, true)['en']['title']);

        if($request->hasFile('image')){
            Storage::delete('public/'.$post->image_path);
            $post_file = $request->file('image');
            $image_path = $post_file->store('posts', 'public');
            $post->image_path = $image_path;
        }

        foreach(json_decode($request->lang, true) as $key=>$lang) {
            $postTrans = PostTrans::where([['post_id', $id], ['lang', $key]])->firstOrFail();
            $postTrans->title = $lang['title'];
            $postTrans->description = $lang['description'];
            $postTrans->content = $lang['content'];
            $postTrans->update();
        }

        PostCategory::where('post_id', $id)->delete();
        foreach(json_decode($request->categories, true) as $category) {
            PostCategory::create([
                'post_id' => $post->id,
                'category_id' => $category['value']
            ]);
        }

        $post->update();

        return response()->json(['message' => 'Edited'], 200);
    }

    public function delete(Request $request)
    {
        $ids = $request->selected;

        foreach($ids as $id) {
            $post = Post::findOrFail($id);

            Storage::delete('public/' . $post->image_path);

            $post->delete();
        }

        return response()->json(['message' => 'Deleted'], 200);
    }

    // public function incrementVisits($id){
    //     $post = Post::findOrFail($id); 
    //     $post->visits = ($post->visits + 1);
    //     $post->update();
    //     return $post->visits;
    // }

    public function getBySlug(Request $request, $slug)
    {
        $query = Post::select(
            'posts.id',
            'posts.slug',
            'posts.image_path',
            'posts.blogger_id',
            'post_trans.title',
            'post_trans.subtitle',
            'post_trans.content'
        )
        ->where('slug', $slug)
        ->withCount([
            'visits'
        ])
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
                    'bloggers.image_path',
                    'blogger_trans.name',
                )->leftJoin('blogger_trans', function($q) {
                    $q->on('blogger_trans.blogger_id', 'bloggers.id');
                    $q->where('blogger_trans.lang', request()->query('lang'));
                });
            },
            'comments' => function ($query) {
                $query->select(
                    'comments.comment',
                    'comments.user_id',
                    'comments.post_id',
                    'comments.id',
                    'comments.created_at'                                
                )
                ->with('user', function($q) {
                    $q->select(
                        'users.id',
                        'users.name',
                        'users.avatar_path'
                    );
                })
                ->with('comment_likes', function($q) {
                    $q->select(
                        'comment_likes.comment_id',
                        'comment_likes.user_id', 
                        'comment_likes.liked'
                    );
                });
            }
        ])
        ->leftJoin('post_trans', function($q) {
            $q->on('post_trans.post_id', 'posts.id');
            $q->where('post_trans.lang', request()->query('lang'));
        });

        return $query->first();
    }

    public function getRequests()
    {
        $query = Post::select(
                        'posts.id',
                        'post_trans.title',
                        'posts.created_at'
                    )
                    ->where('approved', false)
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

    public function approve(Request $request){
        foreach($request->selected as $id){
            $post = Post::findOrFail($id);
            $post->approved = true;
            $post->update();
        }
        
        return response()->json(['message' => 'Approved'], 200);
    }
    public function visit(Request $request)
    {
        $visit = PostVisits::where([['user_id', $request->user_id],['post_id', $request->post_id]]);
        if(!$visit->exists()){
            PostVisits::create([
                'user_id' => $request->user_id,
                'post_id' => $request->post_id
            ]);
        }
    }
}
