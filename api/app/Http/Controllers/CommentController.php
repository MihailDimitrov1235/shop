<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Comment;

class CommentController extends Controller
{
    public function index($id)
    {
        $query = Comment::select(
                        'comments.id as id',
                        'comments.comment',
                        'users.id',
                        'users.name',
                        // 'users.image_path'
                    )
                    ->where('comments.post_id', $id)
                    ->leftJoin('users', function($q) {
                        $q->on('comments.user_id', 'users.id');
                    });
        if(request()->query('total')) {
            $comments = $query->paginate(request()->query('total'))->withQueryString();
        }else {
            $comments = $query->paginate(10)->withQueryString();
        } 
        return $comments;
    }

    public function store(Request $request)
    {
        $comment = Comment::create([
            'comment' => $request->comment,
            'user_id' => $request->user_id,
            'post_id' => $request->post_id
        ]);
    }

    public function edit(Request $request, $id)
    {
        $comment = Comment::findOrFail($id);
        $comment->comment = $request->comment;
        $comment->update();
    }

    public function delete(Request $request, $id)
    {
        Comment::whereIn('id', [$id])->delete();

        return response()->json(['message' => 'Deleted'], 200);
    }
}
