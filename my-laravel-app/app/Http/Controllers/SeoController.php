<?php

namespace App\Http\Controllers;

use App\Models\SeoPage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SeoController extends Controller
{
    public function index()
    {
        $seoPages = SeoPage::all();
        
        return Inertia::render('SEO/index', [
            'seoPages' => $seoPages,
        ]);
    }
}
