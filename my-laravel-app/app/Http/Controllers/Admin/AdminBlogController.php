<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AdminBlogController extends Controller
{
    public function index(Request $request)
    {
        $query = BlogPost::query();

        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', "%{$request->search}%")
                  ->orWhere('created_by', 'like', "%{$request->search}%")
                  ->orWhere('meta_title', 'like', "%{$request->search}%");
            });
        }

        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        $posts = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render('Admin/Blog/index', [
            'posts'   => $posts,
            'filters' => $request->only(['search', 'category_id']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Blog/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'            => 'required|string|max:251',
            'description'      => 'nullable|string',
            'image'            => 'nullable|string|max:500',
            'created_by'       => 'required|string|max:251',
            'category_id'      => 'nullable|integer',
            'meta_title'       => 'nullable|string|max:251',
            'og_title'         => 'nullable|string|max:251',
            'og_description'   => 'nullable|string',
            'meta_keyword'     => 'nullable|string|max:251',
            'image_alt'        => 'nullable|string|max:251',
            'meta_description' => 'nullable|string',
        ]);

        $validated['slug'] = Str::slug($validated['title']);

        // Ensure unique slug
        $baseSlug = $validated['slug'];
        $count    = 1;
        while (BlogPost::where('slug', $validated['slug'])->exists()) {
            $validated['slug'] = $baseSlug . '-' . $count++;
        }

        BlogPost::create($validated);

        return redirect()->route('admin.blog.index')
            ->with('success', 'Blog post created successfully.');
    }

    public function edit(BlogPost $blog)
    {
        return Inertia::render('Admin/Blog/edit', [
            'post' => $blog,
        ]);
    }

    public function update(Request $request, BlogPost $blog)
    {
        $validated = $request->validate([
            'title'            => 'required|string|max:251',
            'description'      => 'nullable|string',
            'image'            => 'nullable|string|max:500',
            'created_by'       => 'required|string|max:251',
            'category_id'      => 'nullable|integer',
            'meta_title'       => 'nullable|string|max:251',
            'og_title'         => 'nullable|string|max:251',
            'og_description'   => 'nullable|string',
            'meta_keyword'     => 'nullable|string|max:251',
            'image_alt'        => 'nullable|string|max:251',
            'meta_description' => 'nullable|string',
        ]);

        $blog->update($validated);

        return redirect()->route('admin.blog.index')
            ->with('success', 'Blog post updated successfully.');
    }

    public function destroy(BlogPost $blog)
    {
        $blog->delete();

        return redirect()->route('admin.blog.index')
            ->with('success', 'Blog post deleted successfully.');
    }
}
