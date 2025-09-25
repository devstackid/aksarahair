<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Intervention\Image\Laravel\Facades\Image;
use Intervention\Image\Encoders\WebpEncoder;

class ArtistController extends Controller
{
  public function index()
    {
        $artists = Employee::with('services.service_item')->get();
        return Inertia::render('Dashboard/Artist/Index', [
            'artists' => $artists,
        ]);
    }

    public function add()
    {
        return Inertia::render('Dashboard/Artist/Add');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:employees',
            'image' => 'required|mimetypes:image/jpeg,image/avif,image/png,image/jpg,image/webp|max:10000',
            'is_conditional_serve' => 'required|boolean',
        ]);

        $is_conditional_serve = $request->is_conditional_serve == 1 ? 1 : 0;

        // Proses gambar ke format .webp
        $image = $request->file('image');
        $filename = Str::uuid() . '.webp';
        $path = 'artist/' . $filename;

            $encodedImage = Image::read($request->file('image'))
                ->encode(new WebpEncoder(quality: 50));

        Storage::disk('public')->put($path, $encodedImage->toString());


        Employee::create([
            'id' => Str::uuid(),
            'name' => $validated['name'],
            'image' => $path,
            'is_conditional_serve' => $is_conditional_serve,
        ]);

        return redirect()->route('dashboard.artists')->with('success', 'Data berhasil ditambahkan!');
    }

    public function edit(Request $request, Employee $artist)
    {
        return Inertia::render('Dashboard/Artist/Edit', [
            'artist' => $artist,
        ]);
    }


    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:employees,name,' . $id,
            'image' => 'nullable|mimetypes:image/jpeg,image/avif,image/png,image/jpg,image/webp|max:10000',
            'is_conditional_serve' => 'required|boolean',
        ]);

        $artist = Employee::find($id);
        if (!$artist) {
            return redirect()->route('dashboard.artists')->with('error', 'Data tidak ditemukan');
        }
       

        if ($request->hasFile('image')) {
            if ($artist->image && Storage::disk('public')->exists($artist->image)) {
                Storage::disk('public')->delete($artist->image);
            }

            $newFileName = Str::uuid() . '.webp';
            $path = 'artist/' . $newFileName;

            // Resize + Encode WebP Quality 50
            $encodedImage = Image::read($request->file('image'))
                ->encode(new WebpEncoder(quality: 50));

            Storage::disk('public')->put($path, $encodedImage->toString());
            $artist->image = $path;
        }

        $artist->name = $request->name;
        $artist->is_conditional_serve = $request->is_conditional_serve == 1 ? 1 : 0;
        $artist->save();

        return redirect()->route('dashboard.artists')->with('success', 'Data berhasil diperbarui!');
    }



    public function bulkDelete(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:employees,id',
        ]);

        $idsToDelete = array_filter($request->ids);

        $artists = Employee::whereIn('id', $idsToDelete)->get();

        foreach($artists as $artist){
            $artist->delete();
        }


        return redirect()->route('dashboard.artists')->with('success', 'Berhasil menghapus data yang dipilih.');
    }

    public function destroy(Employee $artist)
    {
     
        $artist->delete();

        return redirect()->route('dashboard.artists')->with('success', 'Data berhasil dihapus.');
    }
}
