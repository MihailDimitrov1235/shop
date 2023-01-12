<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductTrans extends Model
{
    use HasFactory;

    protected $table = 'product_trans';

    protected $fillable = [
        'name',
        'shortDescription',
        'longDescription',
        'product_id',
        'lang'
    ];
}
