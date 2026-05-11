<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    @php
        $seo = $page['props']['seo'] ?? null;
        $title = $seo['title'] ?? 'Nikhil Sharma - Web Developer & UI/UX Designer';
        $description = $seo['description'] ?? 'Nikhil Sharma - Expert web developer & UI/UX designer in Jaipur.';
        $keywords = $seo['keywords'] ?? 'Web Developer Jaipur, Software Developer Jaipur, Nikhil Sharma, Portfolio';
        $author = $seo['author'] ?? 'Nikhil Sharma';
        $robots = $seo['robots'] ?? 'index, follow';
        $og_image = $seo['og_image'] ?? asset('og-image.jpg');
        $canonical = $seo['canonical'] ?? url()->current();
    @endphp

    <title>{{ $title }}</title>
    <meta name="description" content="{{ $description }}">
    <meta name="keywords" content="{{ $keywords }}">
    <meta name="author" content="{{ $author }}">
    <meta name="robots" content="{{ $robots }}">
    <link rel="canonical" href="{{ $canonical }}">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:title" content="{{ $title }}">
    <meta property="og:description" content="{{ $description }}">
    <meta property="og:image" content="{{ $og_image }}">
    <meta property="og:site_name" content="Nikhil Sharma">

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="{{ url()->current() }}">
    <meta name="twitter:title" content="{{ $title }}">
    <meta name="twitter:description" content="{{ $description }}">
    <meta name="twitter:image" content="{{ $og_image }}">

    @if(isset($seo['structured_data']))
        <script type="application/ld+json">
            {!! is_array($seo['structured_data']) ? json_encode($seo['structured_data']) : $seo['structured_data'] !!}
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
