<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    @php
        $seo        = $page['props']['seo'] ?? null;
        $title      = $seo['title']       ?? 'Nikhil Sharma | Freelance PHP, React & Flutter Developer — Jaipur, India';
        $description= $seo['description'] ?? 'Hire Nikhil Sharma, a Jaipur-based Full Stack Developer with 8+ years building websites, apps & digital solutions. Fast delivery, affordable rates, real results.';
        $keywords   = $seo['keywords']    ?? 'Web Developer Jaipur, PHP Developer Jaipur, React Developer India, Full Stack Developer Jaipur, Nikhil Sharma';
        $author     = $seo['author']      ?? 'Nikhil Sharma';
        $robots     = $seo['robots']      ?? 'index, follow';
        // Use a proper 1200×630 OG social card image
        $og_image   = $seo['og_image']    ?? asset('images/og-social-card.jpg');
        $canonical  = $seo['canonical']   ?? url()->current();
    @endphp

    <title>{{ $title }}</title>
    <meta name="description" content="{{ $description }}">
    <meta name="keywords" content="{{ $keywords }}">
    <meta name="author" content="{{ $author }}">
    <meta name="robots" content="{{ $robots }}">
    <link rel="canonical" href="{{ $canonical }}">

    <!-- Geo / Local SEO -->
    <meta name="geo.region" content="IN-RJ">
    <meta name="geo.placename" content="Jaipur">
    <meta name="geo.position" content="26.9124;75.7873">
    <meta name="ICBM" content="26.9124, 75.7873">

    <!-- Open Graph / Facebook — 1200×630 required -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:title" content="{{ $title }}">
    <meta property="og:description" content="{{ $description }}">
    <meta property="og:image" content="{{ $og_image }}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:type" content="image/jpeg">
    <meta property="og:site_name" content="Nikhil Sharma">
    <meta property="og:locale" content="en_IN">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@nikhilsharma_in">
    <meta name="twitter:creator" content="@nikhilsharma_in">
    <meta name="twitter:title" content="{{ $title }}">
    <meta name="twitter:description" content="{{ $description }}">
    <meta name="twitter:image" content="{{ $og_image }}">

    <!-- Preconnect for performance (Google Fonts, CDN) -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="dns-prefetch" href="https://www.thenikhilsharma.in">
    <link rel="dns-prefetch" href="https://wpdemo.ajufbox.com">

    <!-- Preload LCP hero image (home page) -->
    <link rel="preload" as="image" href="https://www.thenikhilsharma.in/public/profile/images/n2.png" fetchpriority="high">

    <!-- Favicon -->
    <link rel="icon" href="/favicon.ico" sizes="32x32">
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='6' fill='%23131313'/><text x='50%25' y='54%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial,sans-serif' font-weight='700' font-size='18' fill='%23ffffff'>N</text></svg>" type="image/svg+xml">
    <link rel="apple-touch-icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='6' fill='%23131313'/><text x='50%25' y='54%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial,sans-serif' font-weight='700' font-size='18' fill='%23ffffff'>N</text></svg>">

    @if(isset($seo['structured_data']))
        <script type="application/ld+json">
            {!! is_array($seo['structured_data']) ? json_encode($seo['structured_data'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) : $seo['structured_data'] !!}
        </script>
    @endif

    @viteReactRefresh
    @vite(['resources/js/app.jsx'])
    @inertiaHead
</head>
<body class="antialiased bg-gray-50">
    @inertia
</body>
</html>
