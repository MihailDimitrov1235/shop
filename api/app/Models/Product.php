<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\{
    ProductCategory,
    ProductAuthor,
    ProductTrans
};

class Product extends Model
{
    use HasFactory;
    protected $table = 'products';

    protected $fillable = [
        'parts',
    ];

    public function trans()
    {
        return $this->hasMany(ProductTrans::class);
    }

    public function categories()
    {
        return $this->hasMany(ProductCategory::class);
    }

    public function authors()
    {
        return $this->hasMany(ProductAuthor::class);
    }
}
