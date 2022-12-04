<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;
    protected $table = '_project';

    protected $fillable = [
        'ProjectName',
        'Name',
        'stripe_plan',
        'ShortDescriptionBG',
        'DescriptionBG',
    ];

    public function getRouteKeyName(){
        return 'ProjectName';
    }
}
