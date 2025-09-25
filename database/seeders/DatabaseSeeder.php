<?php

namespace Database\Seeders;

// use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $users = [
            [
                'id' => Str::uuid(),
                'name' => 'admin',
                'email' => null,
                'username' => 'admin',
                'password' => Hash::make('admin'),
                'role' => 'admin',
            ],
            // [
            //     'id' => Str::uuid(),
            //     'name' => 'staff4',
            //     'username' => 'staff4',
            //     'password' => Hash::make('staff4'),
            //     'role' => 'staff',
            //     'department' => 'kasir',
            // ],
            // [
            //     'id' => Str::uuid(),
            //     'name' => 'staff5',
            //     'username' => 'staff5',
            //     'password' => Hash::make('staff5'),
            //     'role' => 'staff',
            //     'department' => 'kasir',
            // ],
            // [
            //     'id' => Str::uuid(),
            //     'name' => 'staff6',
            //     'username' => 'staff6',
            //     'password' => Hash::make('staff6'),
            //     'role' => 'staff',
            //     'department' => 'kasir',
            // ],
            // [
            //     'id' => Str::uuid(),
            //     'name' => 'staff7',
            //     'username' => 'staff7',
            //     'password' => Hash::make('staff7'),
            //     'role' => 'staff',
            //     'department' => 'kasir',
            // ],
            // [
            //     'id' => Str::uuid(),
            //     'name' => 'staff8',
            //     'username' => 'staff8',
            //     'password' => Hash::make('staff8'),
            //     'role' => 'staff',
            //     'department' => 'kasir',
            // ],
            // [
            //     'id' => Str::uuid(),
            //     'name' => 'staff9',
            //     'username' => 'staff9',
            //     'password' => Hash::make('staff9'),
            //     'role' => 'staff',
            //     'department' => 'kasir',
            // ],
            // [
            //     'id' => Str::uuid(),
            //     'name' => 'staff10',
            //     'username' => 'staff10',
            //     'password' => Hash::make('staff10'),
            //     'role' => 'staff',
            //     'department' => 'kasir',
            // ],
            // [
            //     'id' => Str::uuid(),
            //     'name' => 'staff11',
            //     'username' => 'staff11',
            //     'password' => Hash::make('staff11'),
            //     'role' => 'staff',
            //     'department' => 'kasir',
            // ],
            // [
            //     'id' => Str::uuid(),
            //     'name' => 'staff12',
            //     'username' => 'staff12',
            //     'password' => Hash::make('staff12'),
            //     'role' => 'staff',
            //     'department' => 'kasir',
            // ],
        ];

        DB::table('users')->insert($users);

        // $categories = [
        //     ['id' => Str::uuid(), 'category_name' => 'Coffee', 'created_at' => now(), 'updated_at' => now()],
        //     ['id' => Str::uuid(), 'category_name' => 'Non-Coffee', 'created_at' => now(), 'updated_at' => now()],
        //     ['id' => Str::uuid(), 'category_name' => 'Milk', 'created_at' => now(), 'updated_at' => now()],
        // ];

        // DB::table('categories')->insert($categories);

        // $categoryId = $categories[0]['id'];
        // $categoryId1 = $categories[1]['id'];
        // $categoryId2 = $categories[2]['id'];

        // DB::table('products')->insert(
        //     [

        //         [
        //             'id' => Str::uuid(),
        //             'name' => 'Espresso',
        //             'image' => 'espresso.jpg',
        //             'price' => 25000,
        //             'total_price' => 25000,
        //             'discount' => 0,
        //             'stock' => '30',
        //             'category_id' => $categoryId,
        //             'created_at' => now(),
        //             'updated_at' => now(),
        //         ],
        //         [
        //             'id' => Str::uuid(),
        //             'name' => 'Americano',
        //             'image' => 'americano.jpg',
        //             'price' => 30000,
        //             'total_price' => 27000,
        //             'discount' => 10,
        //             'stock' => '50',
        //             'category_id' => $categoryId,
        //             'created_at' => now(),
        //             'updated_at' => now(),
        //         ],
        //         [
        //             'id' => Str::uuid(),
        //             'name' => 'Juice',
        //             'image' => 'juice.jpg',
        //             'price' => 15000,
        //             'total_price' => 15000,
        //             'discount' => 0,
        //             'stock' => '14',
        //             'category_id' => $categoryId1,
        //             'created_at' => now(),
        //             'updated_at' => now(),
        //         ],
        //         [
        //             'id' => Str::uuid(),
        //             'name' => 'Milkshake',
        //             'image' => 'milshake.jpg',
        //             'price' => 22000,
        //             'total_price' => 22000,
        //             'discount' => 0,
        //             'stock' => '25',
        //             'category_id' => $categoryId2,
        //             'created_at' => now(),
        //             'updated_at' => now(),
        //         ]

        //     ]
        // );

        // // transactions
        // $transactions = [
        //     [
        //         'id' => Str::uuid(), 
        //         'nama_pelanggan' => 'Agung', 
        //         'kode_transaksi' => '352365', 
        //         'nomor_meja' => '21-A',
        //         'metode_pembayaran' => 'tunai',
        //         'jenis_pesanan' => 'dinein',
        //         'status' => 'belum dibayar',
        //         'subtotal' => 50000,
        //         'created_at' => now(), 
        //         'updated_at' => now()
        //     ],
        //     [
        //         'id' => Str::uuid(), 
        //         'nama_pelanggan' => 'Despita Sari', 
        //         'kode_transaksi' => '878ndf3', 
        //         'nomor_meja' => '22-A',
        //         'metode_pembayaran' => 'tunai',
        //         'jenis_pesanan' => 'dinein',
        //         'status' => 'sudah dibayar',
        //         'subtotal' => 52000,
        //         'created_at' => now(), 
        //         'updated_at' => now()
        //     ],
        //     [
        //         'id' => Str::uuid(),
        //         'nama_pelanggan' => 'Janginam', 
        //         'kode_transaksi' => 'AUX746h', 
        //         'nomor_meja' => '13-A',
        //         'metode_pembayaran' => 'transfer',
        //         'jenis_pesanan' => 'takeaway',
        //         'status' => 'sudah dibayar',
        //         'subtotal' => 25000,
        //         'created_at' => now(), 
        //         'updated_at' => now()
        //     ],
        // ];

        // DB::table('transactions')->insert($transactions);

        // $transactionId = $transactions[0]['id'];
        // $transactionId1 = $transactions[1]['id'];
        // $transactionId2 = $transactions[2]['id'];


        // DB::table('items')->insert(
        //     [

        //         [
        //             'id' => Str::uuid(),
        //             'transaction_id' => $transactionId,
        //             'name' => 'Espresso',
        //             'kategori' => 'Coffee',
        //             'quantity' => 2,
        //             'price' => 25000,
        //             'discount' => 0,
        //             'total_price' => 50000,
        //             'created_at' => now(),
        //             'updated_at' => now(),
        //         ],
        //         [
        //             'id' => Str::uuid(),
        //             'transaction_id' => $transactionId1,
        //             'name' => 'Americano',
        //             'kategori' => 'Coffee',
        //             'quantity' => 1,
        //             'price' => 30000,
        //             'discount' => 10,
        //             'total_price' => 27000,
        //             'created_at' => now(),
        //             'updated_at' => now(),
        //         ],
        //         [
        //             'id' => Str::uuid(),
        //             'transaction_id' => $transactionId1,
        //             'name' => 'Espresso',
        //             'kategori' => 'Coffee',
        //             'quantity' => 1,
        //             'price' => 25000,
        //             'discount' => 0,
        //             'total_price' => 25000,
        //             'created_at' => now(),
        //             'updated_at' => now(),
        //         ],
        //         [
        //             'id' => Str::uuid(),
        //             'transaction_id' => $transactionId2,
        //             'name' => 'Espresso',
        //             'kategori' => 'Coffee',
        //             'quantity' => 1,
        //             'price' => 25000,
        //             'discount' => 0,
        //             'total_price' => 25000,
        //             'created_at' => now(),
        //             'updated_at' => now(),
        //         ],

        //     ]
        // );
    }
}
