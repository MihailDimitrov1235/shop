<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BloggerTrans extends Model
{
    use HasFactory;

    protected $table = 'blogger_trans';

    protected $fillable = [
        'name',
        'description',
        'ocupation',
        'lang',
    ];
}
