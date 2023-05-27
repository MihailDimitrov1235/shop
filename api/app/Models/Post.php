<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\{
    Blogger,
    PostTrans, 
    Comment, 
    PostCategory
};

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'image_path',
        'blogger_id',
        'visits',
        'approved'
    ];

    public function blogger() {
        return $this->BelongsTo(Blogger::class);
    }

    public function trans() {
        return $this->hasMany(PostTrans::class);
    }

    public function comments() {
        return $this->hasMany(Comment::class);
    }

    public function getCommentsPaginatedAttribute()
    {
        return $this->comments()
            ->select(
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
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10, ['*'], 'comment_page');
    }
    
    public function categories()
    {
        return $this->hasMany(PostCategory::class);
    }
    public function visits()
    {
        return $this->hasMany(PostVisits::class);
    }
}
