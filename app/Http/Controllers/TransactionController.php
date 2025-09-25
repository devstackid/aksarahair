<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Item;
use App\Models\Payment;
use App\Models\Product;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Str;

class TransactionController extends Controller
{
    public function index()
    {
        $auth = Auth::user();
        if (!$auth) {
            return redirect()->route('login');
        }

        Carbon::setLocale('id');
        $today = Carbon::now()->toDateString();

        $today_date = Carbon::now()->translatedFormat('l, d F Y');

        $payments = Payment::with('transaction.items')
            ->whereDate('created_at', $today)
            ->orderBy('updated_at', 'desc')
            ->get();

        return Inertia::render('Dashboard/Transaction/Index', [
            'payments' => $payments,
            'today_date' => $today_date
        ]);
    }
    


    public function add()
    {
        $auth = Auth::user();
        if (!$auth) {
            return redirect()->route('login');
        }

        $categories = Category::with('products.category')->get();

        return Inertia::render('Dashboard/Transaction/Add', [
            'categories' => $categories
        ]);
    }



    public function update(Payment $payment)
    {
        $payment->update([
            'payment_status' => 'success',
        ]);

        return back();
    }


    public function store(Request $request)
    {
        $request->validate([
            'nama_pelanggan' => 'required|string',
            // 'nomor_meja' => 'nullable|string',
            'metode_pembayaran' => 'required|string',
            'jenis_pesanan' => 'required|string|in:takeaway,dinein',
            'items' => 'required|array',
            'items.*.id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.note' => 'nullable|string',
        ]);


        $items = [];
        $subtotal = 0;
        

        foreach ($request->items as $item) {
            $product = Product::with('category')->findOrFail($item['id']);

            $total_price = $product->total_price ?? $product->price;
            $total = $total_price * $item['quantity'];

            $items[] = [
                'name' => $product->name,
                'image' => $product->image,
                'kategori' => optional($product->category)->category_name ?? '-',
                'quantity' => $item['quantity'],
                'price' => $product->price,
                'note' => $item['note'] ?? '',
                'discount' => $product->discount,
                'total_price' => $total,
            ];

            $subtotal += $total;
        }

        $transaction = Transaction::create([
            'nama_pelanggan' => $request->nama_pelanggan,
            'kode_transaksi' => 'TRX-' . strtoupper(Str::random(8)),
            // 'nomor_meja' => $request->nomor_meja,
            'metode_pembayaran' => $request->metode_pembayaran,
            'jenis_pesanan' => $request->jenis_pesanan,
            'subtotal' => $subtotal,
        ]);

        foreach ($items as $item) {
            Item::create([
                'transaction_id' => $transaction->id,
                ...$item
            ]);
        }

        Payment::create([
            'transaction_id' => $transaction->id,
            'payment_method' => $request->metode_pembayaran,
        ]);

        return redirect()->route('dashboard.transactions')->with('success', 'Transaksi berhasil dibuat');
    }



    // client
    public function show()
    {

        $categories = Category::with('products.category')->get();

        return Inertia::render('Landing/Menu', [
            'categories' => $categories
        ]);
    }

    public function addNewClientTransaction(Request $request)
    {
        if ($request->filled('website')) {
            session()->put('access_denied', true);
            return redirect()->route('denied');
        }
        $request->validate([
            'nama_pelanggan' => 'required|string|min:2|max:100',
            'nomor_meja' => 'required|string|min:1|max:50',
            'metode_pembayaran' => 'required|string|min:2|max:25',
            'jenis_pesanan' => 'required|string|in:takeaway,dinein',
            'items' => 'required|array',
            'items.*.id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        $items = [];
        $subtotal = 0;

        foreach ($request->items as $item) {
            $product = Product::with('category')->findOrFail($item['id']);

            $total_price = $product->total_price ?? $product->price;
            $total = $total_price * $item['quantity'];

            $items[] = [
                'name' => $product->name,
                'image' => $product->image,
                'kategori' => optional($product->category)->category_name ?? '-',
                'quantity' => $item['quantity'],
                'price' => $product->price,
                'discount' => $product->discount,
                'total_price' => $total,
            ];

            $subtotal += $total;
        }

        $transaction = Transaction::create([
            'nama_pelanggan' => $request->nama_pelanggan,
            'kode_transaksi' => 'TRX-' . strtoupper(Str::random(8)),
            'nomor_meja' => $request->nomor_meja,
            'metode_pembayaran' => $request->metode_pembayaran,
            'jenis_pesanan' => $request->jenis_pesanan,
            'subtotal' => $subtotal,
        ]);

        foreach ($items as $item) {
            Item::create([
                'transaction_id' => $transaction->id,
                ...$item
            ]);
        }

        return redirect()->route('menues.verified', $transaction->id)->with('success', 'Pesanan berhasil dibuat');
    }


    public function history()
    {
        return Inertia::render('Landing/OrderHistory');
    }

    
}
