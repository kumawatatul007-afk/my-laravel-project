<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AdminServiceController extends Controller
{
    public function index()
    {
        $services = Service::orderBy('sort_order')->get();

        return Inertia::render('Admin/Services/index', [
            'services' => $services,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Services/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'subtitle'    => 'nullable|string|max:255',
            'slug'        => 'nullable|string|max:255|unique:services,slug',
            'price_range' => 'nullable|string|max:100',
            'description' => 'nullable|string',
            'features'    => 'nullable|array',
            'features.*'  => 'string|max:255',
            'cta_text'    => 'nullable|string|max:255',
            'sort_order'  => 'integer|min:0',
            'is_active'   => 'boolean',
        ]);

        // Auto-generate slug if not provided
        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        Service::create($validated);

        return redirect()->route('admin.services.index')
            ->with('success', 'Service created successfully.');
    }

    public function edit(Service $service)
    {
        return Inertia::render('Admin/Services/edit', [
            'service' => $service,
        ]);
    }

    public function update(Request $request, Service $service)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'subtitle'    => 'nullable|string|max:255',
            'slug'        => 'nullable|string|max:255|unique:services,slug,' . $service->id,
            'price_range' => 'nullable|string|max:100',
            'description' => 'nullable|string',
            'features'    => 'nullable|array',
            'features.*'  => 'string|max:255',
            'cta_text'    => 'nullable|string|max:255',
            'sort_order'  => 'integer|min:0',
            'is_active'   => 'boolean',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        $service->update($validated);

        return redirect()->route('admin.services.index')
            ->with('success', 'Service updated successfully.');
    }

    public function destroy(Service $service)
    {
        $service->delete();

        return redirect()->route('admin.services.index')
            ->with('success', 'Service deleted successfully.');
    }
}
