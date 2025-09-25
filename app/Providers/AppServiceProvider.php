<?php

namespace App\Providers;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        Inertia::share('flash', function () {
        return [
            'success' => session('success'),
            'reservation' => session('reservation'),
        ];
    });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Vite::prefetch(concurrency: 3);
        // $this->app->booted(function () {
        //     $schedule = $this->app->make(Schedule::class);

        //     $schedule->command('stock:daily-closing')->dailyAt('23:59');
        // });
    }
}
