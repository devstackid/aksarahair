<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Intervention\Image\Laravel\Facades\Image;
use Intervention\Image\Encoders\WebpEncoder;

class GalleryController extends Controller
{
    public function index(){
        
        return Inertia::render('Dashboard/Gallery/Index', [
            'galleries' => Gallery::all()
        ]);
    }

    public function add()
    {
        return Inertia::render('Dashboard/Gallery/Add');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'image' => 'required|image|mimetypes:image/jpeg,image/png,image/jpg,image/webp|max:10000',
        ]);

        
        // Proses gambar ke format .webp
        $image = $request->file('image');
        $filename = Str::uuid() . '.webp';
        $path = 'galleries/' . $filename;

            $encodedImage = Image::read($request->file('image'))
                ->encode(new WebpEncoder(quality: 70));

        Storage::disk('public')->put($path, $encodedImage->toString());

        // Hitung harga total
        
        Gallery::create([
            'id' => Str::uuid(),
            'image' => $path,
            
        ]);

        return redirect()->route('dashboard.galleries')->with('success', 'Data berhasil ditambahkan!');
    }

    public function edit(Gallery $gallery)
    {
       

        return Inertia::render('Dashboard/Gallery/Edit', [
            'gallery' => $gallery,
        ]);
    }


    public function update(Request $request, $id)
    {
        $request->validate([
            
            'image' => 'required|file|mimetypes:image/jpeg,image/png,image/jpg,image/heic,image/webp|max:10000',
            
        ]);

        $gallery = Gallery::find($id);
        if (!$gallery) {
            return redirect()->route('dashboard.galleries')->with('error', 'Foto tidak ditemukan');
        }

        if ($request->hasFile('image')) {
            if ($gallery->image && Storage::disk('public')->exists($gallery->image)) {
                Storage::disk('public')->delete($gallery->image);
            }

            $newFileName = Str::uuid() . '.webp';
            $path = 'products/' . $newFileName;

            // Resize + Encode WebP Quality 50
            $encodedImage = Image::read($request->file('image'))
                ->encode(new WebpEncoder(quality: 70));

            Storage::disk('public')->put($path, $encodedImage->toString());
            $gallery->image = $path;
        }

       

        $gallery->save();

        return redirect()->route('dashboard.galleries')->with('success', 'Foto berhasil diperbarui!');
    }



    public function bulkDelete(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:galleries,id',
        ]);

        $idsToDelete = array_filter($request->ids);

        $galleries = Gallery::whereIn('id', $idsToDelete)->get();

        foreach ($galleries as $gallery) {
            if ($gallery->image && Storage::disk('public')->exists($gallery->image)) {
                Storage::disk('public')->delete($gallery->image);
            }

            $gallery->delete();
        }

        return redirect()->route('dashboard.galleries')->with('success', 'Berhasil menghapus data yang dipilih.');
    }

    public function destroy(Gallery $gallery)
    {
        if ($gallery->image && Storage::disk('public')->exists($gallery->image)) {
            Storage::disk('public')->delete($gallery->image);
        }

        $gallery->delete();

        return redirect()->route('dashboard.galleries')->with('success', 'Foto berhasil dihapus.');
    }
}
