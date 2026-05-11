<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use App\Models\PortfolioItem;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function index()
    {
        $posts = BlogPost::latest()->get();
        $portfolios = PortfolioItem::latest()->get();
        
        $xml = view('sitemap', [
            'posts' => $posts,
            'portfolios' => $portfolios,
        ])->render();

        return response($xml, 200)
            ->header('Content-Type', 'application/xml');
    }

    public function robots()
    {
        $robots = "User-agent: *\n";
        $robots .= "Allow: /\n";
        $robots .= "Sitemap: " . url('sitemap.xml');

        return response($robots, 200)
            ->header('Content-Type', 'text/plain');
    }
}
