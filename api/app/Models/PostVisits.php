<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostVisits extends Model
{

    protected $fillable = [
        'user_id',
        'post_id'
    ];

    use HasFactory;
}
