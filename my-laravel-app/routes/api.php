<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use App\Models\BlogPost;
use App\Models\PortfolioItem;
use App\Models\BlogComment;

// ─── Blog API ────────────────────────────────────────────────────────────────

// Get all blog posts (for public listing)
Route::get('/blog', function () {
    $posts = BlogPost::latest()
        ->get(['id', 'title', 'slug', 'excerpt', 'content', 'image_url', 'author', 'created_by', 'category', 'status', 'published_at', 'created_at']);

    $posts = $posts->map(function ($p) {
        return [
            'id'           => $p->id,
            'title'        => $p->title,
            'slug'         => $p->slug,
            'excerpt'      => $p->excerpt ?: ($p->content ? \Illuminate\Support\Str::limit(strip_tags($p->content), 160) : null),
            'image_url'    => $p->image_url,
            'author'       => $p->author ?: $p->created_by,
            'category'     => $p->category,
            'published_at' => $p->published_at ?: $p->created_at,
        ];
    });

    return response()->json($posts);
});

// Get single blog post by slug
Route::get('/blog/{slug}', function ($slug) {
    $post = BlogPost::where('slug', $slug)->firstOrFail();

    $comments = DB::table('blog_comments')
        ->where('blog_id', $post->id)
        ->orderBy('created_at', 'asc')
        ->get(['id', 'name', 'email', 'description as comment', 'created_at']);

    $prev = BlogPost::where('id', '<', $post->id)->orderBy('id', 'desc')->first(['id', 'title', 'slug', 'image_url']);
    $next = BlogPost::where('id', '>', $post->id)->orderBy('id', 'asc')->first(['id', 'title', 'slug', 'image_url']);

    return response()->json([
        'id'           => $post->id,
        'title'        => $post->title,
        'slug'         => $post->slug,
        'excerpt'      => $post->excerpt,
        'content'      => $post->content,
        'image_url'    => $post->image_url,
        'author'       => $post->author ?: $post->created_by,
        'category'     => $post->category,
        'published_at' => $post->published_at ?: $post->created_at,
        'comments'     => $comments,
        'prev_post'    => $prev ? ['id' => $prev->id, 'slug' => $prev->slug, 'title' => $prev->title, 'image' => $prev->image_url] : null,
        'next_post'    => $next ? ['id' => $next->id, 'slug' => $next->slug, 'title' => $next->title, 'image' => $next->image_url] : null,
    ]);
});

// ─── Portfolio API ────────────────────────────────────────────────────────────

// Get all portfolio items (for public listing)
Route::get('/portfolio', function () {
    $items = PortfolioItem::orderBy('sort_order')->get();

    $items = $items->map(function ($item) {
        return [
            'id'          => $item->id,
            'title'       => $item->title,
            'category'    => $item->category,
            'description' => $item->description,
            'image_url'   => $item->image_url,
            'project_url' => $item->project_url,
            'type'        => $item->type,
            'is_featured' => (bool) $item->is_featured,
            'sort_order'  => $item->sort_order,
            'created_at'  => $item->created_at,
            'updated_at'  => $item->updated_at,
        ];
    });

    return response()->json($items);
});

// Get single portfolio item by ID
Route::get('/portfolio/{id}', function ($id) {
    $item = PortfolioItem::findOrFail($id);

    // Get prev/next portfolio items
    $prev = PortfolioItem::where('id', '<', $id)->orderBy('id', 'desc')->first(['id', 'title', 'image_url']);
    $next = PortfolioItem::where('id', '>', $id)->orderBy('id', 'asc')->first(['id', 'title', 'image_url']);

    return response()->json([
        'item' => [
            'id'          => $item->id,
            'title'       => $item->title,
            'category'    => $item->category,
            'description' => $item->description,
            'image_url'   => $item->image_url,
            'project_url' => $item->project_url,
            'type'        => $item->type,
            'is_featured' => (bool) $item->is_featured,
            'sort_order'  => $item->sort_order,
            'created_at'  => $item->created_at,
            'updated_at'  => $item->updated_at,
        ],
        'prev_item' => $prev,
        'next_item' => $next,
    ]);
});

// ─── Testimonials API ─────────────────────────────────────────────────────────

Route::get('/testimonials', function () {
    try {
        $rows = DB::table('testimonials')
            ->where('is_publish', 1)
            ->get(['id', 'name', 'designation', 'description', 'image']);
    } catch (\Exception $e) {
        // Fallback if is_publish column doesn't exist
        $rows = DB::table('testimonials')
            ->get(['id', 'name', 'designation', 'description', 'image']);
    }

    $rows = $rows->map(function ($r) {
        return [
            'id'       => $r->id,
            'name'     => $r->name,
            'position' => $r->designation ?? '',
            'text'     => $r->description ?? '',
            'image'    => $r->image ?? null,
        ];
    });

    return response()->json($rows);
});
