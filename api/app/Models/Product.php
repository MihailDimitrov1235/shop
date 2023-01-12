<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $table = 'products';

    protected $fillable = [
        'parts',
    ];

    public function categories()
    {
        return $this->belongsToMany(Category::class,'categories');
    }

    // public function authors()
    // {
    //     return $this->belongsToMany(Author::class,'authors');
    // }
}
