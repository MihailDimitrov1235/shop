<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductPart extends Model
{
    use HasFactory;

    protected $fillable = [
        'price',
        'product_id'
    ];
}
