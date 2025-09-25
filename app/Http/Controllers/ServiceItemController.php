<?php

namespace App\Http\Controllers;

use App\Models\ServiceItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceItemController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/ServiceItem/Index', [
            "services" => ServiceItem::all()
        ]);
    }

    public function add()
    {
        return Inertia::render('Dashboard/ServiceItem/Add');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'service_name' => 'required|string|max:255|unique:service_items',
        ]);

        ServiceItem::create([
            'service_name' => $validated['service_name'],
        ]);

        return redirect()->route('dashboard.services.items.add')->with('success', 'Layanan berhasil ditambahkan!');
    }

    public function edit(Request $request, ServiceItem $serviceItem)
    {
        return Inertia::render('Dashboard/ServiceItem/Edit', [
            'serviceItem' => $serviceItem,
        ]);
    }

    public function update(Request $request, ServiceItem $serviceItem)
    {
        $validated = $request->validate([
            'service_name' => 'required|string|max:255|unique:service_items,service_name,' . $serviceItem->id,
        ]);

        $serviceItem->update($validated);

        return redirect()->route('dashboard.services.items');
    }



    public function bulkDelete(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:service_items,id',
        ]);

        $idsToDelete = array_filter($request->ids);

        ServiceItem::whereIn('id', $idsToDelete)->delete();

        return redirect()->route('dashboard.services.items')->with('success', 'Berhasil menghapus data yang dipilih.');
    }

    public function destroy(ServiceItem $serviceItem)
    {

        $serviceItem->delete();

        return redirect()->route('dashboard.services.items')->with('success', 'Data berhasil dihapus.');
    }
}
