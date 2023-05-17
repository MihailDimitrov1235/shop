<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Model\PostTrans;
use App\Model\Comment;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'image_path'
    ];

    public function trans() {
        return $this->hasMany(PostTrans::class);
    }

    public function comments(): HasMany{
        return $this->hasMany(Comment::class);
    }
    
}
