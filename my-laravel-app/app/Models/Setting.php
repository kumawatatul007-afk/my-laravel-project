<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $table = 'settings';

    protected $fillable = [
        'website_title',
        'strating_keyword',
        'locations',
        'email',
        'phone',
        'address',
        'preloader',
        'timing',
        'logo',
        'favicon',
    ];
}
