<?php

use App\Http\Controllers\ArtistController;
use App\Http\Controllers\Auth\OAuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\PricelistController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\ServiceItemController;
use App\Http\Controllers\TestimonialController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Middleware\OnlyPelangganOrGuest;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::middleware([OnlyPelangganOrGuest::class])->group(function () {
    Route::get('/', [LandingController::class, 'index'])
        ->name('index')
        ->middleware('throttle:50,1'); 
    Route::get('/about', [LandingController::class, 'about'])
        ->name('about')
        ->middleware('throttle:50,1'); 
    Route::get('/teams', [LandingController::class, 'teams'])
        ->name('teams')
        ->middleware('throttle:50,1'); 
    Route::get('/pricelist', [LandingController::class, 'pricelist'])
        ->name('pricelist')
        ->middleware('throttle:50,1'); 
    Route::get('/gallery', [LandingController::class, 'gallery'])
        ->name('gallery')
        ->middleware('throttle:50,1'); 
    Route::get('/review', [LandingController::class, 'review'])
        ->name('review')
        ->middleware('throttle:50,1'); 
    Route::get('/product', [LandingController::class, 'product'])
        ->name('product')
        ->middleware('throttle:50,1'); 

    Route::get('/reservation', [LandingController::class, 'reservation'])
        ->name('reservation')
        ->middleware('throttle:50,1'); 

    Route::post('/reservation/store', [LandingController::class, 'store'])
        ->name('reservation.store')
        ->middleware('throttle:50,1'); 

    // Route::get('/reservation/history/{reservation}', [LandingController::class, 'history'])
    //     ->name('history')
    //     ->middleware('throttle:50,1'); 

        Route::post('/review/store', [LandingController::class, 'reviewStore'])->name('review.store')->middleware('throttle:20,1');

        Route::get('/api/reviews/fetch', [LandingController::class, 'fetchReviews']);
});



Route::middleware('guest')->group(function () {
    Route::get('/login', function () {
        return Inertia::render('Auth/Login', [
            'canLogin' => Route::has('login')
        ]);
    })->name('login')->middleware('throttle:50,1');

    Route::get('/auth/redirect/{provider}', [OAuthController::class, 'redirect']);
    Route::get('/auth/callback/{provider}', [OAuthController::class, 'callback']);
});

Route::get('/api/reservations', [ReservationController::class, 'fetchHours'])->middleware('throttle:50,1');


Route::middleware('auth', 'web')->group(function () {
    Route::middleware([AdminMiddleware::class])->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

        Route::get('/dashboard/users', [UserController::class, 'index'])->name('dashboard.users');
        Route::get('/dashboard/users/add', [UserController::class, 'add'])->name('dashboard.users.add');
        Route::post('/dashboard/users/store', [UserController::class, 'store'])->name('dashboard.users.store');
        Route::get('/dashboard/users/edit/{user}', [UserController::class, 'edit'])->name('dashboard.users.edit');
        Route::patch('/dashboard/users/edit/{user}', [UserController::class, 'update'])->name('dashboard.users.update');
        Route::post('/dashboard/users/bulk-delete', [UserController::class, 'bulkDelete'])->name('dashboard.users.bulkDelete');
        Route::delete('/dashboard/users/{user}', [UserController::class, 'destroy'])->name('dashboard.users.destroy');

        Route::get('/dashboard/services/item', [ServiceItemController::class, 'index'])->name('dashboard.services.items');
        Route::get('/dashboard/services/item/add', [ServiceItemController::class, 'add'])->name('dashboard.services.items.add');
        Route::post('/dashboard/services/item/store', [ServiceItemController::class, 'store'])->name('dashboard.services.items.store');
        Route::get('/dashboard/services/item/edit/{serviceItem}', [ServiceItemController::class, 'edit'])->name('dashboard.services.items.edit');
        Route::patch('/dashboard/services/item/update/{serviceItem}', [ServiceItemController::class, 'update'])->name('dashboard.services.items.update');
        Route::post('/dashboard/services/item/bulk-delete', [ServiceItemController::class, 'bulkDelete'])->name('dashboard.services.items.bulkDelete');
        Route::delete('/dashboard/services/item/{serviceItem}', [ServiceItemController::class, 'destroy'])->name('dashboard.services.items.destroy');


        Route::get('/dashboard/artist', [ArtistController::class, 'index'])->name('dashboard.artists');
        Route::get('/dashboard/artist/add', [ArtistController::class, 'add'])->name('dashboard.artist.add');
        Route::post('/dashboard/artist/store', [ArtistController::class, 'store'])->name('dashboard.artist.store');
        Route::get('/dashboard/artist/edit/{artist}', [ArtistController::class, 'edit'])->name('dashboard.artist.edit');
        Route::post('/dashboard/artist/update/{artist}', [ArtistController::class, 'update'])->name('dashboard.artist.update');
        Route::post('/dashboard/artist/bulk-delete', [ArtistController::class, 'bulkDelete'])->name('dashboard.artist.bulkDelete');
        Route::delete('/dashboard/artist/{artist}', [ArtistController::class, 'destroy'])->name('dashboard.artist.destroy');



        Route::get('/dashboard/service/add/{artist}', [ServiceController::class, 'add'])->name('dashboard.services.add');
        Route::post('/dashboard/service/store', [ServiceController::class, 'store'])->name('dashboard.services.store');
        Route::delete('/dashboard/service/delete/{service}', [ServiceController::class, 'destroy'])->name('dashboard.services.destroy');

        Route::get('/dashboard/reservation', [ReservationController::class, 'index'])->name('dashboard.reservations');
        Route::get('/dashboard/reservation/add', [ReservationController::class, 'add'])->name('dashboard.reservation.add');
        Route::post('/dashboard/reservation/store', [ReservationController::class, 'store'])->name('dashboard.reservation.store');
        Route::get('/dashboard/reservation/edit/{reservation}', [ReservationController::class, 'edit'])->name('dashboard.reservation.edit');
        Route::patch('/dashboard/reservation/update/{reservation}', [ReservationController::class, 'update'])->name('dashboard.reservation.update');
        Route::patch('/dashboard/reservation/status/update/{reservation}/{status}', [ReservationController::class, 'updateStatus'])
            ->name('dashboard.reservation.status.update');
        Route::post('/dashboard/reservation/bulk-delete', [ReservationController::class, 'bulkDelete'])->name('dashboard.reservation.bulkDelete');
        Route::delete('/dashboard/reservation/{reservation}', [ReservationController::class, 'destroy'])->name('dashboard.reservation.destroy');

        Route::get('/dashboard/testimonial', [TestimonialController::class, 'index'])->name('dashboard.testimonials');
        Route::post('/dashboard/testimonial/bulk-delete', [TestimonialController::class, 'bulkDelete'])->name('dashboard.testimonial.bulkDelete');
        Route::delete('/dashboard/testimonial/{testimonial}', [TestimonialController::class, 'destroy'])->name('dashboard.testimonial.destroy');
        Route::get('/api/testimonials/data', [TestimonialController::class, 'fetchTestimonials']);
        




        Route::get('/api/reservations/data', [ReservationController::class, 'fetchReservations']);

        Route::get('/dashboard/setting', [DashboardController::class, 'setting'])->name('dashboard.settings');
        Route::patch('/dashboard/setting/update/{id}', [DashboardController::class, 'update'])->name('dashboard.setting.update');


        Route::get('/dashboard/pricelist', [PricelistController::class, 'index'])->name('dashboard.pricelists');
        Route::get('/dashboard/pricelist/add', [PricelistController::class, 'add'])->name('dashboard.pricelist.add');
        Route::post('/dashboard/pricelist/store', [PricelistController::class, 'store'])->name('dashboard.pricelist.store');
        Route::get('/dashboard/pricelist/edit/{pricelist}', [PricelistController::class, 'edit'])->name('dashboard.pricelist.edit');
        Route::put('/dashboard/pricelist/update/{pricelist}', [PricelistController::class, 'update'])->name('dashboard.pricelist.update');
        Route::post('/dashboard/pricelist/bulk-delete', [PricelistController::class, 'bulkDelete'])->name('dashboard.pricelist.bulkDelete');
        Route::delete('/dashboard/pricelist/{pricelist}', [PricelistController::class, 'destroy'])->name('dashboard.pricelist.destroy');


        Route::get('/dashboard/product', [ProductController::class, 'index'])->name('dashboard.products');
        Route::get('/dashboard/product/add', [ProductController::class, 'add'])->name('dashboard.product.add');
        Route::post('/dashboard/product/store', [ProductController::class, 'store'])->name('dashboard.product.store');
        Route::get('/dashboard/product/edit/{product}', [ProductController::class, 'edit'])->name('dashboard.product.edit');
        Route::post('/dashboard/product/update/{product}', [ProductController::class, 'update'])->name('dashboard.product.update');
        Route::post('/dashboard/product/bulk-delete', [ProductController::class, 'bulkDelete'])->name('dashboard.product.bulkDelete');
        Route::delete('/dashboard/product/{product}', [ProductController::class, 'destroy'])->name('dashboard.product.destroy');


        Route::get('/dashboard/gallery', [GalleryController::class, 'index'])->name('dashboard.galleries');
        Route::get('/dashboard/gallery/add', [GalleryController::class, 'add'])->name('dashboard.gallery.add');
        Route::post('/dashboard/gallery/store', [GalleryController::class, 'store'])->name('dashboard.gallery.store');
        Route::get('/dashboard/gallery/edit/{gallery}', [GalleryController::class, 'edit'])->name('dashboard.gallery.edit');
        Route::post('/dashboard/gallery/update/{gallery}', [GalleryController::class, 'update'])->name('dashboard.gallery.update');
        Route::post('/dashboard/gallery/bulk-delete', [GalleryController::class, 'bulkDelete'])->name('dashboard.gallery.bulkDelete');
        Route::delete('/dashboard/gallery/{gallery}', [GalleryController::class, 'destroy'])->name('dashboard.gallery.destroy');



        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });
});


Route::fallback(function () {
    return redirect()->route('index');
});

require __DIR__ . '/auth.php';
