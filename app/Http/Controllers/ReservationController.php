<?php

namespace App\Http\Controllers;

use App\Models\Config;
use App\Models\Employee;
use App\Models\Reservation;
use App\Models\Service;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;


class ReservationController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/Reservation/Index');
    }

    public function add()
    {
        $services = Service::with(['employee', 'service_item'])->get();
        return Inertia::render('Dashboard/Reservation/Add', [
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
            'date'           => 'required|date',
            'time'           => 'required|date_format:H:i',
            'service_id'     => 'required|uuid|exists:services,id',
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


        Reservation::create([
            'id'             => Str::uuid(),
            'customer_name'  => $validated['customer_name'],
            'customer_phone' => $validated['customer_phone'],
            'is_conditional_serve' => $is_conditional_serve,
            'normal_price' => $normal_price,
            'weekday_price' => $weekday_price,
            'weekend_price' => $weekend_price,
            'date'           => $dateOnly,
            'time'           => $validated['time'],
            'service_id'     => $validated['service_id'],
        ]);

        return redirect()->route('dashboard.reservation.add')->with('success', 'Data berhasil ditambahkan!');
    }

    public function edit(Request $request, Reservation $reservation)
    {
        $services = Service::with(['employee', 'service_item'])->get();

        $reservation->load('service');

        return Inertia::render('Dashboard/Reservation/Edit', [
            'reservation' => $reservation,
            'services' => $services,
            'employees' => Employee::all(),
            'config' => Config::Latest()->first()
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'customer_name'  => 'required|string|min:0|max:100',
            'customer_phone' => 'required|string|min:0|max:100',
            'customer_email' => 'nullable|email|min:0|max:100',
            'date'           => 'required|date_format:Y-m-d',
            'time'           => 'required|date_format:H:i',
            'service_id'     => 'required|uuid|exists:services,id',
        ]);

        $now = Carbon::now();
        $dateOnly = Carbon::parse($validated['date'])->toDateString();

        // Validasi hanya kalau booking-nya hari ini
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


        // Ambil data lama
        $reservation = Reservation::findOrFail($id);

        $reservation->update([
            'customer_name'  => $validated['customer_name'],
            'customer_phone' => $validated['customer_phone'],
            'customer_email' => $validated['customer_email'] ?: null,
            'is_conditional_serve' => $is_conditional_serve,
            'normal_price' => $normal_price,
            'weekday_price' => $weekday_price,
            'weekend_price' => $weekend_price,
            'date'           => $dateOnly,
            'time'           => $validated['time'],
            'service_id'     => $validated['service_id'],
        ]);

        return redirect()
            ->route('dashboard.reservation.edit', $reservation->id)
            ->with('success', 'Data berhasil diperbarui!');
    }



    public function fetchHours(Request $request)
{
    $date = $request->query('date');
    $serviceId = $request->query('service_id'); // tetap diterima kalau mau dipakai logika lain

    if (!$date) {
        return response()->json([
            'error' => 'Tanggal wajib diisi'
        ], 400);
    }

    // Ambil semua jam reservasi pada tanggal tsb
    $reserved = Reservation::where('date', $date)
        ->whereIn('status', ['pending', 'confirmed'])
        ->pluck('time')
        ->toArray();

    return response()->json($reserved);
}



    public function bulkDelete(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:reservations,id',
        ]);

        $idsToDelete = array_filter($request->ids);

        $reservations = Reservation::whereIn('id', $idsToDelete)->get();

        foreach ($reservations as $reservation) {
            $reservation->delete();
        }


        return redirect()->route('dashboard.reservations')->with('success', 'Berhasil menghapus data yang dipilih.');
    }

    public function destroy(Reservation $reservation)
    {

        $reservation->delete();

        return redirect()->route('dashboard.reservations')->with('success', 'Data berhasil dihapus.');
    }


    public function fetchReservations(Request $request)
    {
        $query = Reservation::query()->with(['service.service_item', 'service.employee'])->orderBy('created_at', 'desc');

        if ($request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('customer_name', 'like', "%$search%")
                    ->orWhere('customer_phone', 'like', "%$search%")
                    ->orWhere('customer_email', 'like', "%$search%");
            });
        }

        if ($request->status) {
            $query->where('status', $request->status);
        }

        if ($request->date) {
            $query->whereDate('date', $request->date);
        }

        $perPage = $request->get('per_page', 10);
        return $query->orderBy('date', 'desc')->paginate($perPage);
    }

    public function updateStatus(Request $request, $reservationId, $status)
    {
        $allowedStatus = ['pending', 'confirmed', 'cancelled'];
        if (!in_array($status, $allowedStatus)) {
            return redirect()->back()->withErrors(['status' => 'Status tidak valid.']);
        }

        $reservation = Reservation::findOrFail($reservationId);

        $reservation->update([
            'status' => $status
        ]);

        return response()->json([
            'success' => true,
            'message' => "Status reservation berhasil diubah menjadi {$status}."
        ]);
    }
}
