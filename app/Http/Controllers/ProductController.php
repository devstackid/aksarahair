<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Support\Str;
use Intervention\Image\Laravel\Facades\Image;
use Intervention\Image\Encoders\WebpEncoder;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(){
        return Inertia::render('Dashboard/Product/Index', [
            'products' => Product::all()
        ]);
    }

    public function add()
    {
        return Inertia::render('Dashboard/Product/Add');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:products',
            'image' => 'required|image|mimetypes:image/jpeg,image/png,image/jpg,image/webp|max:10000',
            'description' => 'required|string|max:255',
            'link' => 'required|string|max:255',
        ]);

               // Proses gambar ke format .webp
        $image = $request->file('image');
        $filename = Str::uuid() . '.webp';
        $path = 'products/' . $filename;

            $encodedImage = Image::read($request->file('image'))
                ->resize(500, 500, fn($constraint) => $constraint->aspectRatio()) // Resize max 800x800 px
                ->encode(new WebpEncoder(quality: 50));

        Storage::disk('public')->put($path, $encodedImage->toString());

        
        Product::create([
            'id' => Str::uuid(),
            'name' => $validated['name'],
            'image' => $path,
            'description' => $validated['description'],
            'link' => $validated['link'],
            
        ]);

        return redirect()->route('dashboard.products')->with('success', 'Produk berhasil ditambahkan!');
    }

    public function edit(Product $product)
    {
        return Inertia::render('Dashboard/Product/Edit', [
            'product' => $product
        ]);
    }


    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:products,name,' . $id,
            'image' => 'nullable|file|mimetypes:image/jpeg,image/png,image/jpg,image/heic,image/webp|max:10000',
            'description' => 'required|string|max:255',
            'link' => 'required|string|max:255',
        ]);

        $product = Product::find($id);
        if (!$product) {
            return redirect()->route('dashboard.products')->with('error', 'Produk tidak ditemukan');
        }

        if ($request->hasFile('image')) {
            if ($product->image && Storage::disk('public')->exists($product->image)) {
                Storage::disk('public')->delete($product->image);
            }

            $newFileName = Str::uuid() . '.webp';
            $path = 'products/' . $newFileName;

            // Resize + Encode WebP Quality 50
            $encodedImage = Image::read($request->file('image'))
                ->resize(500, 500, fn($constraint) => $constraint->aspectRatio()) // Resize max 800x800 px
                ->encode(new WebpEncoder(quality: 50));

            Storage::disk('public')->put($path, $encodedImage->toString());
            $product->image = $path;
        }

        $product->name = $request->name;
        $product->description = $request->description;
        $product->link = $request->link;
        

        $product->save();

        return redirect()->route('dashboard.products')->with('success', 'Produk berhasil diperbarui!');
    }



    public function bulkDelete(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:products,id',
        ]);

        $idsToDelete = array_filter($request->ids);

        $products = Product::whereIn('id', $idsToDelete)->get();

        foreach ($products as $product) {
            if ($product->image && Storage::disk('public')->exists($product->image)) {
                Storage::disk('public')->delete($product->image);
            }

            $product->delete();
        }

        return redirect()->route('dashboard.products')->with('success', 'Berhasil menghapus data yang dipilih.');
    }

    public function destroy(Product $product)
    {
        if ($product->image && Storage::disk('public')->exists($product->image)) {
            Storage::disk('public')->delete($product->image);
        }

        $product->delete();

        return redirect()->route('dashboard.products')->with('success', 'Produk berhasil dihapus.');
    }
}
