<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use App\Models\PortfolioItem;
use App\Models\Category;
use App\Models\Service;
use Inertia\Inertia;

class PublicController extends Controller
{
    /**
     * Home page — latest blogs + featured portfolio + services + settings
     */
    public function home()
    {
        $blogPosts = BlogPost::latest()
            ->take(3)
            ->get(['id', 'title', 'slug', 'description', 'image', 'created_by', 'created_at']);

        $portfolios = PortfolioItem::where('is_featured', true)
            ->orderBy('sort_order')
            ->take(6)
            ->get(['id', 'title', 'category', 'image_url', 'project_url', 'type']);

        // Fallback: agar featured nahi hain toh latest lo
        if ($portfolios->isEmpty()) {
            $portfolios = PortfolioItem::orderBy('sort_order')
                ->take(6)
                ->get(['id', 'title', 'category', 'image_url', 'project_url', 'type']);
        }

        // Services for home page cards + keyword/service chips
        $services = \App\Models\Service::where('is_active', true)
            ->orderBy('sort_order')
            ->get(['id', 'title', 'subtitle', 'slug', 'description', 'features', 'cta_text']);

        // Site settings for keyword highlights
        $setting = \App\Models\Setting::first();

        return Inertia::render('home/index', [
            'blogPosts'  => $blogPosts,
            'portfolios' => $portfolios,
            'services'   => $services,
            'setting'    => $setting,
        ]);
    }

    /**
     * Blog listing page
     */
    public function blog()
    {
        $posts = BlogPost::latest()
            ->get(['id', 'title', 'slug', 'description', 'image', 'meta_title', 'category_id', 'created_by', 'created_at']);

        return Inertia::render('Blog/index', [
            'posts' => $posts,
        ]);
    }

    /**
     * Blog detail page
     */
    public function blogDetail($slug)
    {
        $post = BlogPost::where('slug', $slug)->firstOrFail();

        return Inertia::render('Blog/BlogDetail/index', [
            'post' => $post,
        ]);
    }

    /**
     * Blog detail with sidebar
     */
    public function blogDetailSidebar($slug)
    {
        $post = BlogPost::where('slug', $slug)->firstOrFail();

        $recentPosts = BlogPost::latest()
            ->where('id', '!=', $post->id)
            ->take(5)
            ->get(['id', 'title', 'slug', 'image', 'created_at']);

        return Inertia::render('Blog/BlogDetailSidebar/index', [
            'post'        => $post,
            'recentPosts' => $recentPosts,
        ]);
    }

    /**
     * Portfolio listing page
     */
    public function portfolio()
    {
        $items = PortfolioItem::orderBy('sort_order')
            ->get(['id', 'title', 'category', 'description', 'image_url', 'project_url', 'type', 'is_featured']);

        return Inertia::render('Portfolio/index', [
            'items' => $items,
        ]);
    }

    /**
     * Portfolio list page (alternate)
     */
    public function portfolioList()
    {
        $items = PortfolioItem::orderBy('sort_order')
            ->get(['id', 'title', 'category', 'description', 'image_url', 'project_url', 'type', 'is_featured']);

        return Inertia::render('Portfolio/PortfolioList/index', [
            'items' => $items,
        ]);
    }

    /**
     * Portfolio project detail
     */
    public function portfolioDetail($id)
    {
        $item = PortfolioItem::findOrFail($id);

        $related = PortfolioItem::where('id', '!=', $id)
            ->where('category', $item->category)
            ->take(3)
            ->get(['id', 'title', 'category', 'image_url']);

        return Inertia::render('Portfolio/ProjectDetail/index', [
            'item'    => $item,
            'id'      => $id,
            'related' => $related,
        ]);
    }

    /**
     * Services page
     */
    public function services()
    {
        $services = Service::where('is_active', true)
            ->orderBy('sort_order')
            ->get(['id', 'title', 'subtitle', 'slug', 'price_range', 'description', 'features', 'cta_text']);

        return Inertia::render('Services/index', [
            'services' => $services,
        ]);
    }

    /**
     * Single service detail page
     */
    public function serviceDetail($slug)
    {
        $service = Service::where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        // Related services (other active services, excluding current)
        $related = Service::where('is_active', true)
            ->where('id', '!=', $service->id)
            ->orderBy('sort_order')
            ->take(3)
            ->get(['id', 'title', 'subtitle', 'slug', 'price_range', 'cta_text']);

        return Inertia::render('Services/Detail/index', [
            'service' => $service,
            'related' => $related,
        ]);
    }
}
