<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\ProductFile;

class ProductPart extends Model
{
    use HasFactory;

    protected $fillable = [
        'price',
        'product_id'
    ];

    public function files()
    {
        return $this->morphMany(ProductFile::class, 'parent','type');
    }
}
