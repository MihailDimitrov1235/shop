<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartProduct extends Model
{
    use HasFactory;

    protected $table = 'cart_product';

    protected $fillable = [
        'part_id',
        'product_id',
        'cart_id'
    ];
}
