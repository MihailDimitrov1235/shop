<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoryTrans extends Model
{
    use HasFactory;

    protected $table = 'category_trans';

    protected $fillable = [
        'name',
        'category_id',
        'lang'
    ];
}
