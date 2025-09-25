<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;


class ConfigSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $configs = [
            [
                'id' => Str::uuid(),
                'open_time' => '08:00',
                'closing_time' => '22:00',
                'whatsapp' => '62895631780343',
                'alamat' => 'Jl. Pangeran Antasari No. 77, Kel. Kemuning, Kec. Banjarbaru Selatan Kalimantan Selatan, Indonesia 70713',
            ],
        ];

        DB::table('configs')->insert($configs);
    }
}
