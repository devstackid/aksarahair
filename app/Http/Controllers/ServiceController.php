<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Service;
use App\Models\ServiceItem;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;


class ServiceController extends Controller
{
    public function add(Request $request, Employee $artist)
    {
        $artist->load('services.service_item');

        $usedServiceItemIds = $artist->services->pluck('service_item_id');

        $layanans = ServiceItem::whereNotIn('id', $usedServiceItemIds)->get();

        return Inertia::render('Dashboard/Artist/Services/Add', [
            'artist' => $artist,
            'layanans' => $layanans,
        ]);
    }

    public function store(Request $request)
    {

        $validated = $request->validate([
            'normal_price' => 'nullable|numeric|min:0',
            'weekday_price' => 'nullable|numeric|min:0',
            'weekend_price' => 'nullable|numeric|min:0',
            'service_item_id' => 'required|uuid|exists:service_items,id',
            'employee_id' => 'required|uuid|exists:employees,id',
        ]);

        $alreadyExists = Service::where('employee_id', $validated['employee_id'])
            ->where('service_item_id', $validated['service_item_id'])
            ->exists();

        if ($alreadyExists) {
            return redirect()
                ->back()
                ->withErrors(['service_item_id' => 'Layanan sudah terdaftar untuk hair artist ini.'])
                ->withInput();
        }

        Service::create([
            'id' => Str::uuid(),
            'normal_price' => $validated['normal_price'] ?? 0,
            'weekday_price' => $validated['weekday_price'] ?? 0,
            'weekend_price' => $validated['weekend_price'] ?? 0,
            'service_item_id' => $validated['service_item_id'],
            'employee_id' => $validated['employee_id'],
        ]);

        return redirect()->route('dashboard.services.add', $validated['employee_id'])->with('success', 'Data berhasil ditambahkan!');
    }

    public function destroy(Service $service)
    {
        $employeeId = $service->employee_id;
        $service->delete();

        return redirect()->route('dashboard.services.add', $employeeId)->with('success', 'Data berhasil dihapus.');
    }
}
