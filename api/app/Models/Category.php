<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\CategoryTrans;

class Category extends Model
{
    use HasFactory;

    public function trans() {
        return $this->hasMany(CategoryTrans::class);
    }
}
