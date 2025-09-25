<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

        <title inertia>{{ config('app.name', 'Nexiro Hair') }}</title>

        <meta property="og:title" content="Booking Appointment System - Nexiro " />
<meta property="og:description" content="Digital Solution For Reservation System Optimization" />
<meta property="og:url" content="https://book.nexvitation.com" />
<meta property="og:type" content="website" />
<meta property="og:image" content="https://book.nexvitation.com/image.JPG" />
<meta property="og:image:type" content="image/JPG" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="manifest" href="/site.webmanifest">

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
        
        <link href="https://cdn.jsdelivr.net/npm/daisyui@5" rel="stylesheet" type="text/css" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased overflow-hidden">
        @inertia



    </body>
</html>
