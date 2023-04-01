<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\{
    Product,
    ProductPart
};

class CartProduct extends Model
{
    use HasFactory;

    protected $table = 'cart_product';

    protected $fillable = [
        'part_id',
        'product_id',
        'cart_id'
    ];

    public function product() {
        return $this->belongsTo(Product::class);
    }

    public function parts() {
        return $this->hasMany(ProductPart::class, 'id', 'part_id');
    }
}
