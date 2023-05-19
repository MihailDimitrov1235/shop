<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Model\{
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
        'visits'
    ];

    public function trans() {
        return $this->hasMany(PostTrans::class);
    }

    public function comments(): HasMany{
        return $this->hasMany(Comment::class);
    }
    
    public function categories()
    {
        return $this->hasMany(PostCategory::class);
    }
}
