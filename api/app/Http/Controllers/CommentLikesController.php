<?php

namespace App\Http\Controllers;

use App\Models\CommentLikes;
use Illuminate\Http\Request;

class CommentLikesController extends Controller
{
    public function like(Request $request)
    {
        if(CommentLikes::where([['user_id', $request->user_id],['comment_id', $request->comment_id]])->exists())
        {

            $commentLikes = CommentLikes::where([['user_id', $request->user_id],['comment_id', $request->comment_id]])->findFirstOrFail();
            $commentLikes->liked = true;
            $commentLikes->update();

        }else{

            CommentLikes::create([
                'user_id' => $request->user_id,
                'comment_id' => $request->comment_id,
                'liked' => true
            ]);

        }
    }

    public function dislike(Request $request)
    {

        if(CommentLikes::where([['user_id', $request->user_id],['comment_id', $request->comment_id]])->exists())
        {

            $commentLikes = CommentLikes::where([['user_id', $request->user_id],['comment_id', $request->comment_id]])->findFirstOrFail();
            $commentLikes->liked = false;
            $commentLikes->update();

        }else{

            CommentLikes::create([
                'user_id' => $request->user_id,
                'comment_id' => $request->comment_id,
                'liked' => false
            ]);

        }
    }

    public function delete(Request $request)
    {

        $commentLikes = CommentLikes::where([['user_id', $request->user_id],['comment_id', $request->comment_id]])->findFirstOrFail();
        $commentLikes->delete();
        
    }

}
