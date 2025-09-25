<?php

namespace App\Http\Controllers;

use App\Models\Config;
use App\Models\Employee;
use App\Models\Reservation;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // pelanggan terdaftar
        $customers = User::where('role', 'pelanggan')->get();

        // hair artist (employee)
        $artists = Employee::with('services.service_item')->get();

        // 3 data reservasi terbaru
        $reservations = Reservation::with(['service.service_item', 'service.employee'])
            ->latest()
            ->take(3)
            ->get();

        // total reservasi per status
        $pendingReservation = Reservation::where('status', 'pending')->count();
        $confirmedReservation = Reservation::where('status', 'confirmed')->count();
        $cancelledReservation = Reservation::where('status', 'cancelled')->count();

        // layanan paling banyak digunakan
        $highestService = Reservation::select('service_id')
            ->selectRaw('COUNT(*) as total')
            ->groupBy('service_id')
            ->orderByDesc('total')
            ->with('service.service_item')
            ->first();

        return Inertia::render('Dashboard/Index', [
            'customers'           => $customers,
            'artists'             => $artists,
            'reservations'        => $reservations,
            'pendingReservation'  => $pendingReservation,
            'confirmedReservation' => $confirmedReservation,
            'cancelledReservation' => $cancelledReservation,
            'highestService'      => $highestService,
        ]);
    }



    public function setting()
    {
        return Inertia::render('Dashboard/Setting/Edit', [
            'config' => Config::latest()->first()
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'open_time'  => 'required|string|min:0|max:100',
            'closing_time'  => 'required|string|min:0|max:100',
            'whatsapp'  => 'required|string|min:0|max:100',
            'alamat'  => 'required|string|min:0|max:255',
        ]);

        $config = Config::findOrFail($id);

        $config->update([
            'open_time'  => $validated['open_time'],
            'closing_time'  => $validated['closing_time'],
            'whatsapp'  => $validated['whatsapp'],
            'alamat'  => $validated['alamat'],
        ]);

        return redirect()
            ->route('dashboard.settings')
            ->with('success', 'Data berhasil diperbarui!');
    }
}
