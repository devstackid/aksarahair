<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>@yield('title')</title>

        <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet">
 <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        <style>


body {
    font-family: 'Inter', sans-serif;
}
        </style>
       

    </head>
    <body class="antialiased bg-white text-black">
        <div class="w-full min-h-screen flex items-center justify-center md:px-20 py-20 px-5">
    <div class="flex flex-col h-full items-center justify-center">
        @php
            $code = trim($__env->yieldContent('code'));
        @endphp

        @if ($code == '401')
            <img src="/assets/401.svg" alt="Unauthorized" class="w-[70%] md:w-[50%] ">
        @elseif ($code == '402')
            <img src="/assets/402.svg" alt="Payment Required" class="w-[70%] md:w-[50%] ">
        @elseif ($code == '403')
            <img src="/assets/403.svg" alt="Forbidden" class="w-[70%] md:w-[50%] ">
        @elseif ($code == '404')
            <img src="/assets/404.svg" alt="Not Found" class="w-[70%] md:w-[50%] ">
        @elseif ($code == '419')
            <img src="/assets/419.svg" alt="Page Expired" class="w-[70%] md:w-[50%] ">
        @elseif ($code == '429')
            <img src="/assets/429.svg" alt="Too Many Requests" class="w-[70%] md:w-[50%] ">
        @elseif ($code == '500')
            <img src="/assets/500.svg" alt="Internal Server Error" class="w-[70%] md:w-[50%] ">
        @elseif ($code == '503')
            <img src="/assets/503.svg" alt="Service Unavailable" class="w-[70%] md:w-[50%] ">
        @else
            <img src="/assets/503.svg" alt="Error" class="w-[70%] md:w-[50%] ">
        @endif

        <div class="text-sm font-bold mt-10 text-center">
            @yield('message_title')
        </div>
        <p class="text-xs font-normal mt-2 text-center">
            @yield('message_description')
        </p>

    </div>
</div>

        {{-- <div class="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
            <div class="max-w-xl mx-auto sm:px-6 lg:px-8">
                <div class="flex items-center pt-8 sm:justify-start sm:pt-0">
                    <div class="px-4 text-lg text-gray-500 border-r border-gray-400 tracking-wider">
                        @yield('code')
                    </div>

                    <div class="ml-4 text-lg text-gray-500 uppercase tracking-wider">
                        @yield('message_title')
                    </div>
                </div>
            </div>
        </div> --}}
    </body>
</html>
