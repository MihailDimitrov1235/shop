<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\AuthorTrans;

class Author extends Model
{
    use HasFactory;

    protected $fillable = [
        'phone',
        'approved'
    ];

    public function trans() {
        return $this->hasMany(AuthorTrans::class);
    }
}
