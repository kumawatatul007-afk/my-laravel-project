<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use App\Models\PortfolioItem;
use App\Models\Service;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function index()
    {
        $posts      = BlogPost::whereNotNull('slug')->where('slug', '!=', '')->latest()->get();
        $portfolios = PortfolioItem::latest()->get();
        $services   = Service::where('is_active', true)->whereNotNull('slug')->where('slug', '!=', '')->latest()->get();

        $xml = view('sitemap', [
            'posts'      => $posts,
            'portfolios' => $portfolios,
            'services'   => $services,
        ])->render();

        return response($xml, 200)
            ->header('Content-Type', 'application/xml; charset=UTF-8')
            ->header('Cache-Control', 'public, max-age=3600');
    }

    public function robots()
    {
        $robots = "User-agent: *\n";
        $robots .= "Allow: /\n";
        $robots .= "Disallow: /admin/\n";
        $robots .= "Disallow: /login\n";
        $robots .= "Disallow: /register\n";
        $robots .= "\n# Sitemaps\n";
        $robots .= "Sitemap: " . url('sitemap.xml');

        return response($robots, 200)
            ->header('Content-Type', 'text/plain; charset=UTF-8');
    }
}
