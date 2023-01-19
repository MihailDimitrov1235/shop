<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AuthorTrans extends Model
{
    use HasFactory;

    protected $table = 'author_trans';

    protected $fillable = [
        'name',
        'author_id',
        'lang'
    ];
}
