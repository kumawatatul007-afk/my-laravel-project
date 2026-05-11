<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PortfolioItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminPortfolioController extends Controller
{
    public function index(Request $request)
    {
        // Only show results when user has explicitly searched
        $hasSearched = $request->has('searched');

        if (!$hasSearched) {
            return Inertia::render('Admin/Portfolio/index', [
                'items'       => null,
                'filters'     => ['search' => ''],
                'hasSearched' => false,
            ]);
        }

        $query = PortfolioItem::query();

        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', "%{$request->search}%")
                  ->orWhere('category', 'like', "%{$request->search}%");
            });
        }

        $items = $query->orderBy('sort_order')->latest()->paginate(10)->withQueryString();

        return Inertia::render('Admin/Portfolio/index', [
            'items'       => $items,
            'filters'     => $request->only(['search']),
            'hasSearched' => true,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Portfolio/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'category'    => 'required|string|max:100',
            'description' => 'nullable|string',
            'image_url'   => 'nullable|url|max:500',
            'project_url' => 'nullable|url|max:500',
            'type'        => 'required|in:image,video',
            'is_featured' => 'boolean',
            'sort_order'  => 'integer|min:0',
        ]);

        PortfolioItem::create($validated);

        return redirect()->route('admin.portfolio.index')
            ->with('success', 'Portfolio item created successfully.');
    }

    public function edit(PortfolioItem $portfolio)
    {
        return Inertia::render('Admin/Portfolio/edit', [
            'item' => $portfolio,
        ]);
    }

    public function update(Request $request, PortfolioItem $portfolio)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'category'    => 'required|string|max:100',
            'description' => 'nullable|string',
            'image_url'   => 'nullable|url|max:500',
            'project_url' => 'nullable|url|max:500',
            'type'        => 'required|in:image,video',
            'is_featured' => 'boolean',
            'sort_order'  => 'integer|min:0',
        ]);

        $portfolio->update($validated);

        return redirect()->route('admin.portfolio.index')
            ->with('success', 'Portfolio item updated successfully.');
    }

    public function destroy(PortfolioItem $portfolio)
    {
        $portfolio->delete();

        return redirect()->route('admin.portfolio.index')
            ->with('success', 'Portfolio item deleted successfully.');
    }
}
