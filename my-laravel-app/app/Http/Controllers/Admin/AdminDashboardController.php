<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\ContactMessage;
use App\Models\PortfolioItem;
use App\Models\User;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_users'       => User::count(),
            'total_portfolio'   => PortfolioItem::count(),
            'total_blogs'       => BlogPost::count(),
            'unread_messages'   => ContactMessage::where('is_read', false)->count(),
            'published_blogs'   => BlogPost::count(), // blogs table has no status column
            'featured_projects' => PortfolioItem::where('is_featured', true)->count(),
        ];

        $recent_users = User::latest()
            ->take(5)
            ->get(['id', 'name', 'email', 'created_at']);

        $recent_messages = ContactMessage::latest()
            ->take(5)
            ->get(['id', 'name', 'email', 'subject', 'is_read', 'created_at']);

        $recent_blogs = BlogPost::latest()
            ->take(5)
            ->get(['id', 'title', 'created_at']);

        return Inertia::render('Admin/Dashboard/index', [
            'stats'            => $stats,
            'recent_users'     => $recent_users,
            'recent_messages'  => $recent_messages,
            'recent_blogs'     => $recent_blogs,
        ]);
    }
}
