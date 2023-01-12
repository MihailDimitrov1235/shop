<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Author;

class ProductAuthor extends Model
{
    use HasFactory;

    protected $table = 'product_author';

    protected $fillable = [
        'product_id',
        'author_id'
    ];

    public function author() {
        return $this->hasOne(Author::class, 'id', 'author_id');
    }
}
