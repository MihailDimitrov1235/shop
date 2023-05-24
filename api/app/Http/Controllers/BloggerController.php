<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\{
    Blogger,
    BloggerTrans
};

class BloggerController extends Controller
{
    public function index()
    {
        $query = Blogger::select(
            'bloggers.id as id',
            'bloggers.phone',
            'bloggers.email',
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
            'email' => $request->email,
            'links' => $request->links,
            'image_path' => $image_path,
        ]);
        foreach(json_decode($request->lang, true) as $key=>$lang) {
            BloggerTrans::create([
                'name' => $lang['name'],
                'occupation' => $lang['occupation'],
                'description' => $lang['description'],
                'blogger_id' => $blogger->id,
                'user_id' => $request->user_id,
                'lang' => $key
            ]);
        }
        
        // return $blogger;
    }

    public function getById($id){
        $blogger = Blogger::select(
            'bloggers.id as id',
            'bloggers.phone',
            'bloggers.email',
            'bloggers.links',
            'bloggers.image_path',
            'blogger_trans.name',
            'blogger_trans.occupation',
            'blogger_trans.description'
        )
        ->where('bloggers.id', $id)
        ->leftJoin('blogger_trans', function($q) {
            $q->on('blogger_trans.blogger_id', 'bloggers.id');
            $q->where('blogger_trans.lang', request()->query('lang'));
        });
        return $blogger->get();
    }

    public function edit(Request $request, $id){
        $blogger = Blogger::findOrFail($id);
        $blogger->phone = $request->phone;
        $blogger->email = $request->email;
        $blogger->links = json_decode($request->links, true);

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

        $blogger->update();

        return response()->json(['message' => 'Edited'], 200);
    }

    public function delete(Request $request) {
        $ids = $request->selected;

        foreach($ids as $id) {
            $blogger = Blogger::findOrFail($id);
            Storage::delete('public/' . $blogger->image_path);
            $blogger->delete();
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
