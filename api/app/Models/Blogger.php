<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blogger extends Model
{
    use HasFactory;

    protected $fillable = [
        'phone',
        'email',
        'links',
        'image_path',
        'approved'
    ];

    public function trans() {
        return $this->hasMany(BloggerTrans::class);
    }
}
