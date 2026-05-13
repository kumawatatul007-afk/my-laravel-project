<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class BlogPost extends Model
{
    use HasFactory;

    protected $table = 'blogs';

    protected $fillable = [
        'category_id',
        'title',
        'slug',
        'description',
        'image',
        'meta_title',
        'og_title',
        'og_description',
        'meta_keyword',
        'image_alt',
        'meta_description',
        'created_by',
    ];

    protected $casts = [
        'description' => 'string',
        'created_at'  => 'datetime',
        'updated_at'  => 'datetime',
    ];

    /**
     * Auto-generate slug from title if not provided.
     */
    public static function generateSlug(string $title): string
    {
        return Str::slug($title);
    }
}
