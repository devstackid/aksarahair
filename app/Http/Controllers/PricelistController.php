<?php

namespace App\Http\Controllers;

use App\Models\Pricelist;
use App\Models\PricelistItem;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class PricelistController extends Controller
{
    public function index()
    {
        $pricelists = Pricelist::with('items')->get();
        return Inertia::render('Dashboard/Pricelist/Index', [
            'pricelists' => $pricelists
        ]);
    }

    public function add()
    {
        return Inertia::render('Dashboard/Pricelist/Add');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'            => 'required|string|max:255|unique:pricelists',
            'description'     => 'required|string|max:255',
            'min_price'       => 'nullable|numeric|min:0',
            'max_price'       => 'nullable|numeric|min:0',
            'is_custom_price' => 'nullable|boolean',
            'items'           => 'nullable|array',
            'items.*.name'       => 'required_with:items|string|max:255',
            'items.*.min_price'  => 'nullable|numeric|min:0',
            'items.*.max_price'  => 'nullable|numeric|min:0',
        ]);

        // default custom price kalau min/max kosong atau < 1
        $is_custom_price = ($request->min_price < 1 || $request->max_price < 1) ? 1 : 0;

        // cek jika ada item dengan harga valid (>0)
        if (!empty($validated['items'])) {
            foreach ($validated['items'] as $item) {
                if (($item['min_price'] ?? 0) > 0 || ($item['max_price'] ?? 0) > 0) {
                    $is_custom_price = 0; // override ke non custom
                    break;
                }
            }
        }



        $pricelist = Pricelist::create([
            'id'             => Str::uuid(),
            'name'           => $validated['name'],
            'description'    => $validated['description'],
            'min_price'      => $validated['min_price'],
            'max_price'      => $validated['max_price'],
            'is_custom_price' => $is_custom_price,
        ]);

        // Simpan items jika ada
        if (!empty($validated['items'])) {
            foreach ($validated['items'] as $item) {
                $pricelist->items()->create([
                    'id'        => Str::uuid(),
                    'name'      => $item['name'],
                    'min_price' => $item['min_price'] ?? 0,
                    'max_price' => $item['max_price'] ?? 0,
                ]);
            }
        }


        return redirect()->route('dashboard.pricelists')->with('success', 'Data berhasil ditambahkan!');
    }

    public function edit(Pricelist $pricelist)
    {
        $pricelist->load('items');
        return Inertia::render('Dashboard/Pricelist/Edit', [
            'pricelist' => $pricelist,
            'items' => PricelistItem::all()
        ]);
    }


    public function update(Request $request, Pricelist $pricelist)
    {
        $validated = $request->validate([
            'name'            => 'required|string|max:255|unique:pricelists,name,' . $pricelist->id,
            'description'     => 'required|string|max:255',
            'min_price'       => 'nullable|numeric|min:0',
            'max_price'       => 'nullable|numeric|min:0',
            'is_custom_price' => 'nullable|boolean',
            'items'           => 'nullable|array',
            'items.*.id'         => 'nullable|uuid|exists:pricelist_items,id',
            'items.*.name'       => 'required_with:items|string|max:255',
            'items.*.min_price'  => 'nullable|numeric|min:0',
            'items.*.max_price'  => 'nullable|numeric|min:0',
        ]);

        // default custom price kalau min/max kosong atau < 1
        $is_custom_price = ($request->min_price < 1 || $request->max_price < 1) ? 1 : 0;

        // cek jika ada item dengan harga valid (>0)
        if (!empty($validated['items'])) {
            foreach ($validated['items'] as $item) {
                if (($item['min_price'] ?? 0) > 0 || ($item['max_price'] ?? 0) > 0) {
                    $is_custom_price = 0; // override ke non custom
                    break;
                }
            }
        }

        // update pricelist
        $pricelist->update([
            'name'           => $validated['name'],
            'description'    => $validated['description'],
            'min_price'      => $validated['min_price'],
            'max_price'      => $validated['max_price'],
            'is_custom_price' => $is_custom_price,
        ]);

        // update items
        $existingIds = $pricelist->items()->pluck('id')->toArray();
        $sentIds = [];

        if (!empty($validated['items'])) {
            foreach ($validated['items'] as $item) {
                if (!empty($item['id'])) {
                    // update item lama
                    $pricelist->items()->where('id', $item['id'])->update([
                        'name'      => $item['name'],
                        'min_price' => $item['min_price'] ?? 0,
                        'max_price' => $item['max_price'] ?? 0,
                    ]);
                    $sentIds[] = $item['id'];
                } else {
                    // tambah item baru
                    $newItem = $pricelist->items()->create([
                        'id'        => Str::uuid(),
                        'name'      => $item['name'],
                        'min_price' => $item['min_price'] ?? 0,
                        'max_price' => $item['max_price'] ?? 0,
                    ]);
                    $sentIds[] = $newItem->id;
                }
            }
        }

        // hapus item lama yang tidak dikirim lagi
        $toDelete = array_diff($existingIds, $sentIds);
        if (!empty($toDelete)) {
            $pricelist->items()->whereIn('id', $toDelete)->delete();
        }

        return redirect()->route('dashboard.pricelists')->with('success', 'Data berhasil diperbarui!');
    }




    public function bulkDelete(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:pricelists,id',
        ]);

        $idsToDelete = array_filter($request->ids);

        $pricelists = Pricelist::whereIn('id', $idsToDelete)->get();

        foreach ($pricelists as $pricelist) {

            $pricelist->delete();
        }

        return redirect()->route('dashboard.pricelists')->with('success', 'Berhasil menghapus data yang dipilih.');
    }

    public function destroy(Pricelist $pricelist)
    {


        $pricelist->delete();

        return redirect()->route('dashboard.pricelists')->with('success', 'Data berhasil dihapus.');
    }
}
