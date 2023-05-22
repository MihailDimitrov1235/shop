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
        //'blogger_id',
        'visits',
        'approved'
    ];

    public function blogger() {
        return $this->BelongsTo(Blogger::class, 'blogger_id');
    }

    public function trans() {
        return $this->hasMany(PostTrans::class);
    }

    public function comments() {
        return $this->hasMany(Comment::class);
    }
    
    public function categories()
    {
        return $this->hasMany(PostCategory::class);
    }
}
