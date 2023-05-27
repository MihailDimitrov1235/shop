<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\{
    Blogger,
    BloggerTrans,
    User,
    Role,
    BloggerLinks
};

class BloggerController extends Controller
{
    public function index()
    {
        $query = Blogger::select(
            'bloggers.id as id',
            'bloggers.phone',
            'bloggers.approved',
            'blogger_trans.name'
        )
        ->leftJoin('blogger_trans', function($q) {
            $q->on('blogger_trans.blogger_id', 'bloggers.id');
            $q->where('blogger_trans.lang', request()->query('lang'));
        });
        return $query->get();
    }

    public function store(Request $request)
    {
        $blogger_file = $request->file('image');
        $image_path = $blogger_file->store('bloggers', 'public');

        $blogger = Blogger::create([
            'phone' => $request->phone,
            'image_path' => $image_path,
            'user_id' => $request->user_id,
        ]);
        foreach($request->links as $key=>$link) {
            BloggerLinks::create([
                'blogger_id' => $blogger->id,
                'link' => $link
            ]);
        }
        foreach(json_decode($request->lang, true) as $key=>$lang) {
            BloggerTrans::create([
                'name' => $lang['name'],
                'occupation' => $lang['occupation'],
                'description' => $lang['description'],
                'blogger_id' => $blogger->id,
                'lang' => $key
            ]);
        }

        $user = User::findOrFail($request->user_id);
        $roleId = Role::where('name', 'Blogger')->first()->id;
        $user->role_id = $roleId;
        $user->update();
        
        return $blogger;
    }

    public function getById($id){
        $blogger = Blogger::select(
            'bloggers.id as id',
            'bloggers.user_id',
            'bloggers.phone',
            'bloggers.image_path',
            'blogger_trans.name',
            'blogger_trans.occupation',
            'blogger_trans.description'
        )
        ->where('bloggers.id', $id)
        ->leftJoin('blogger_trans', function($q) {
            $q->on('blogger_trans.blogger_id', 'bloggers.id');
            $q->where('blogger_trans.lang', request()->query('lang'));
        })
        ->with([
            'user' => function ($query) {
                $query->select(
                    'users.id',
                    'users.email'
                );
            },
            'links' => function ($query) {
                $query->select(
                    'blogger_links.blogger_id',
                    'blogger_links.link'
                );
            },
            'posts' => function ($query) {
                $query->select(
                    'posts.id',
                    'posts.slug',
                    'posts.image_path',
                    'posts.blogger_id',
                    'post_trans.title',
                    'post_trans.subtitle'
                )
                ->withCount([
                    'visits'
                ])
                ->leftJoin('post_trans', function($q) {
                    $q->on('post_trans.post_id', 'posts.id');
                    $q->where('post_trans.lang', request()->query('lang'));
                });
            }
        ]);
        return $blogger->get();
    }

    public function edit(Request $request, $id){
        $blogger = Blogger::findOrFail($id);
        $blogger->phone = $request->phone;
        $blogger->email = $request->email;

        if($request->hasFile('image')){
            Storage::delete('public/'.$blogger->image_path);
            $blogger_file = $request->file('image');
            $image_path = $blogger_file->store('bloggers', 'public');
            $blogger->image_path = $image_path;
        }

        foreach(json_decode($request->lang, true) as $key=>$lang) {
            $bTrans = BloggerTrans::where([['blogger_id', $id], ['lang', $key]])->firstOrFail();
            $bTrans->name = $lang['name'];
            $bTrans->occupation = $lang['occupation'];
            $bTrans->description = $lang['description'];

            $bTrans->update();
        }

        BloggerLinks::where('blogger_id', $id)->delete();
        foreach($request->links as $key=>$link) {
            BloggerLinks::create([
                'blogger_id' => $blogger->id,
                'link' => $link
            ]);
        }

        $blogger->update();

        return response()->json(['message' => 'Edited'], 200);
    }

    public function delete(Request $request) {
        $ids = $request->selected;

        foreach($ids as $id) {
            $blogger = Blogger::findOrFail($id);
            Storage::delete('public/' . $blogger->image_path);
            $blogger->delete();
            BloggerLinks::where('blogger_id', $id)->delete();
            BloggerTrans::where('blogger_id', $id)->delete();
        }

        return response()->json(['message' => 'Deleted'], 200);
    }

    public function getRequests() {
        $query = Blogger::select(
            'bloggers.id as id',
            'blogger_trans.name',
            'bloggers.created_at'
        )
        ->where('bloggers.approved', false)
        ->leftJoin('blogger_trans', function($q) {
            $q->on('blogger_trans.blogger_id', 'bloggers.id');
            $q->where('blogger_trans.lang', request()->query('lang'));
        });
        return $query->get();
    }

    public function approve($id){
        $blogger = Blogger::findOrFail($id);
        $blogger->approved = true;
        $blogger->update();
    }
}
