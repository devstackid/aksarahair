<?php

namespace App\Http\Controllers;

use App\Models\Testimonial;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TestimonialController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/Testimonial/Index');
    }


    public function bulkDelete(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:testimonials,id',
        ]);

        $idsToDelete = array_filter($request->ids);

        $testimonials = Testimonial::whereIn('id', $idsToDelete)->get();

        foreach ($testimonials as $testimonial) {
            $testimonial->delete();
        }


        return redirect()->route('dashboard.testimonials')->with('success', 'Berhasil menghapus data yang dipilih.');
    }

    public function destroy(Testimonial $testimonial)
    {

        $testimonial->delete();

        return redirect()->route('dashboard.testimonials')->with('success', 'Data berhasil dihapus.');
    }


    public function fetchTestimonials(Request $request)
    {
        $query = Testimonial::with('user')->orderBy('created_at', 'desc');

        // Pencarian
        if ($request->search) {
            $search = $request->search;

            $query->where(function ($q) use ($search) {
                $q->where('text', 'like', "%$search%")
                    ->orWhereHas('user', function ($uq) use ($search) {
                        $uq->where('name', 'like', "%$search%")
                            ->orWhere('email', 'like', "%$search%");
                    });
            });
        }

        if ($request->date) {
            $query->whereDate('created_at', $request->date);
        }

        $perPage = $request->get('per_page', 10);

        return $query->orderBy('created_at', 'desc')->paginate($perPage);
    }
}
