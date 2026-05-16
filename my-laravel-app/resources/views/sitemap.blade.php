<?php echo '<?xml version="1.0" encoding="UTF-8"?>'; ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

    {{-- ── Static Pages ── --}}
    <url>
        <loc>{{ url('/') }}</loc>
        <lastmod>{{ now()->toAtomString() }}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>{{ url('/about') }}</loc>
        <lastmod>{{ now()->toAtomString() }}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>{{ url('/services') }}</loc>
        <lastmod>{{ now()->toAtomString() }}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.85</priority>
    </url>
    <url>
        <loc>{{ url('/portfolio') }}</loc>
        <lastmod>{{ now()->toAtomString() }}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>{{ url('/blog') }}</loc>
        <lastmod>{{ now()->toAtomString() }}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>{{ url('/contact') }}</loc>
        <lastmod>{{ now()->toAtomString() }}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>
    <url>
        <loc>{{ url('/web-developer-jaipur') }}</loc>
        <lastmod>{{ now()->toAtomString() }}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>{{ url('/privacy-policy') }}</loc>
        <lastmod>{{ now()->toAtomString() }}</lastmod>
        <changefreq>yearly</changefreq>
        <priority>0.4</priority>
    </url>
    <url>
        <loc>{{ url('/terms-of-service') }}</loc>
        <lastmod>{{ now()->toAtomString() }}</lastmod>
        <changefreq>yearly</changefreq>
        <priority>0.4</priority>
    </url>

    {{-- ── Service Pages ── --}}
    @foreach ($services as $service)
    @if ($service->slug)
    @php
        $slugParts = explode('-', $service->slug, 2);
        $svcPrefix = ucfirst($slugParts[0] ?? $service->slug);
        $svcRest   = $slugParts[1] ?? '';
        $svcUrl    = $svcRest ? "/service/{$svcPrefix}/{$svcRest}" : "/service/{$svcPrefix}";
    @endphp
    <url>
        <loc>{{ url($svcUrl) }}</loc>
        <lastmod>{{ $service->updated_at->toAtomString() }}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.75</priority>
    </url>
    @endif
    @endforeach

    {{-- ── Blog Posts ── --}}
    @foreach ($posts as $post)
    @if ($post->slug)
    <url>
        <loc>{{ url('/' . $post->slug) }}</loc>
        <lastmod>{{ $post->updated_at->toAtomString() }}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>
    @endif
    @endforeach

    {{-- ── Portfolio Items ── --}}
    @foreach ($portfolios as $portfolio)
    <url>
        <loc>{{ url('/portfolio/' . $portfolio->id) }}</loc>
        <lastmod>{{ $portfolio->updated_at->toAtomString() }}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
    </url>
    @endforeach

    {{-- ── Keyword Pages ── --}}
    @foreach ($keywordUrls as $kwUrl)
    <url>
        <loc>{{ url($kwUrl) }}</loc>
        <lastmod>{{ now()->toAtomString() }}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    @endforeach

</urlset>
