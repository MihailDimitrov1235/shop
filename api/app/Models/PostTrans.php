<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostTrans extends Model
{
    use HasFactory;

    protected $table = 'post_trans';

    protected $fillable = [
        'title',
        'description',
        'content',
        'post_id',
        'lang'
    ];
}
