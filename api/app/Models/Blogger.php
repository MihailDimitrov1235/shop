<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blogger extends Model
{
    use HasFactory;

    protected $fillable = [
        'phone',
        'user_id',
        'image_path',
        'approved'
    ];

    public function trans() {
        return $this->hasMany(BloggerTrans::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function links() {
        return $this->hasMany(BloggerLinks::class);
    }

    public function posts() {
        return $this->hasMany(Post::class);
    }
}
