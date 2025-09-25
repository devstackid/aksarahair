<?php

namespace App\Http\Controllers;

use App\Helpers\BadWordFilter;
use App\Models\Config;
use App\Models\Employee;
use App\Models\Gallery;
use App\Models\Pricelist;
use App\Models\Product;
use App\Models\Reservation;
use App\Models\Service;
use App\Models\Testimonial;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;


class LandingController extends Controller
{
    public function index()
    {

        $pricelists = Pricelist::with('items')->get();


        $products = Product::latest()->take(10)->get();

        $galleries = Gallery::latest()->take(8)->get();

        return Inertia::render('Landing/Index', [
            'pricelists' => $pricelists,
            'config' => Config::latest()->first(),
            'products' => $products,
            'teams' => Employee::all(),
            'galleries' => $galleries,
            'reviews' => Testimonial::count()
        ]);
        
    }

    public function fetchReviews(Request $request)
    {
        $sort = $request->get('sort', 'recent');

        $query = Testimonial::query()->with('user');

        switch ($sort) {
            case 'highest':
                $query->whereBetween('stars', [4, 5])->orderBy('stars', 'desc');
                break;

            case 'lowest':
                $query->whereBetween('stars', [1, 3])->orderBy('stars', 'asc');
                break;
            case 'recent':
            default:
                $query->orderBy('created_at', 'desc');
                break;
        }

        return response()->json($query->get());
    }



    public function reservation()
    {
        $services = Service::with(['employee', 'service_item'])->get();
        return Inertia::render('Landing/Reservation', [
            'services' => $services,
            'employees' => Employee::all(),
            'config' => Config::Latest()->first()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_name'  => 'required|string|min:0|max:100',
            'customer_phone' => 'required|string|min:0|max:100',
            'customer_email' => 'nullable|email|min:0|max:100',
            'date'           => 'required|date',
            'time'           => 'required|date_format:H:i',
            'service_id'     => 'required|uuid|exists:services,id',
        ], [
            'customer_name.required'  => 'Nama wajib diisi.',
            'customer_phone.required' => 'Nomor HP wajib diisi.',
            'customer_email.email'    => 'Format email tidak valid.',
            'date.required'           => 'Tanggal wajib diisi.',
            'time.required'           => 'Jam wajib diisi.',
            'time.date_format'        => 'Format jam harus HH:MM.',
            'service_id.required'     => 'Layanan wajib dipilih.',
            'service_id.exists'       => 'Layanan yang dipilih tidak tersedia.',
        ]);

        $now = Carbon::now();

        $dateOnly = Carbon::parse($validated['date'])->toDateString();

        if (Carbon::parse($dateOnly)->isToday()) {
            $bookingDateTime = Carbon::parse($dateOnly)->setTimeFromTimeString($validated['time']);

            if ($bookingDateTime->lessThan($now->copy()->addHours(4))) {
                return back()
                    ->withErrors(['time' => 'Waktu booking harus minimal 4 jam dari sekarang.'])
                    ->withInput();
            }
        }

        $service_id = $validated['service_id'];

        $service = Service::where('id', $service_id)->first();

        $employee = Employee::where('id', $service->employee_id)->first();

        $is_conditional_serve = $employee->is_conditional_serve;

        if ($is_conditional_serve == 0) {
            $normal_price = $service->normal_price;
            $weekday_price = null;
            $weekend_price = null;
        } else {
            $weekday_price = $service->weekday_price;
            $weekend_price = $service->weekend_price;
            $normal_price = null;
        }

        // ⬇⬇⬇ TAMBAHAN: transaksi + locking untuk mencegah race condition
        \Illuminate\Support\Facades\DB::beginTransaction();
        try {
            // Kunci baris slot yang sama agar request lain menunggu
            $existing = Reservation::where('service_id', $validated['service_id'])
                ->where('date', $dateOnly)
                ->where('time', $validated['time'])
                ->lockForUpdate()
                ->first();

            if ($existing) {
                \Illuminate\Support\Facades\DB::rollBack();
                return back()
                    ->withErrors(['time' => 'Slot waktu ini sudah dipesan.'])
                    ->withInput();
            }

            $reservation_data = Reservation::create([
                'id'                 => Str::uuid(),
                'customer_name'      => $validated['customer_name'],
                'customer_phone'     => $validated['customer_phone'],
                'customer_email'     => $validated['customer_email'] ?: null,
                'is_conditional_serve' => $is_conditional_serve,
                'normal_price'       => $normal_price,
                'weekday_price'      => $weekday_price,
                'weekend_price'      => $weekend_price,
                'date'               => $dateOnly,
                'time'               => $validated['time'],
                'service_id'         => $validated['service_id'],
            ]);

            \Illuminate\Support\Facades\DB::commit();

            return response()->json([
                'success' => true,
                'reservation' => $reservation_data
            ]);
        } catch (\Illuminate\Database\QueryException $e) {
            \Illuminate\Support\Facades\DB::rollBack();

            if ($e->getCode() === '23000') {
                return response()->json([
                    'success' => false,
                    'errors' => [
                        'time' => 'Slot waktu ini sudah dipesan.'
                    ]
                ], 422); // 422 = Unprocessable Entity (validasi)
            }

            // error umum lainnya
            return response()->json([
                'success' => false,
                'errors' => [
                    'general' => 'Terjadi kesalahan, silakan coba lagi.'
                ]
            ], 500);
        }
    }

    public function history(Reservation $reservation)
    {
        $reservation->load(['service.service_item', 'service.employee']);
        return Inertia::render('Landing/History', [
            'reservation' => $reservation
        ]);
    }


    public function reviewStore(Request $request)
    {
        if (!empty($request->input('website'))) {
            return back()->with('error', 'Terdeteksi sebagai spam.');
        }

        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'text'    => 'required|string|max:1000',
            'stars'   => 'required|integer|min:1|max:5',
        ], [
            'text.required'  => 'Review tidak boleh kosong.',
            'text.max'       => 'Review maksimal 1000 karakter.',
            'stars.required' => 'Beri rating bintang.',
            'stars.min'      => 'Minimal 1 bintang.',
            'stars.max'      => 'Maksimal 5 bintang.',
        ]);

        $user = User::where('id', $request->user_id)->first();
        $name = $user->name;


        // Batasi hanya 5 review per bulan
        $count = Testimonial::where('user_id', $request->user_id)
            ->whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->count();

        if ($count >= 5) {
            return back()->with('error', 'Anda hanya dapat memberikan maksimal 5 review dalam 1 bulan.');
        }

        // Sensor kata kasar
        $validated['text'] = BadWordFilter::filter($validated['text']);

        $validated['name'] = $name;

        Testimonial::create($validated);

        return back()->with('success', 'Terima kasih! Review Anda berhasil dikirim.');
    }
}
