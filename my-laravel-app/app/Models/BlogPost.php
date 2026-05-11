<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class BlogPost extends Model
{
    use HasFactory;

    protected $table = 'blog_posts';

    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'content',
        'image_url',
        'author',
        'category',
        'status',
        'published_at',
    ];

    /**
     * Auto-generate slug from title if not provided.
     */
    public static function generateSlug(string $title): string
    {
        return Str::slug($title);
    }
}
