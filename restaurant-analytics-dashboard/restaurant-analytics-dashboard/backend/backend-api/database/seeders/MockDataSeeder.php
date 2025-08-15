<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class MockDataSeeder extends Seeder
{
    public function run(): void
    {
        $rjson = base_path('database/seeders/data/restaurants.json');
        $ojson = base_path('database/seeders/data/orders.json');

        $restaurants = json_decode(File::get($rjson), true);
        $orders = json_decode(File::get($ojson), true);

        // Disable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        // Truncate in child -> parent order
        DB::table('orders')->truncate();
        DB::table('restaurants')->truncate();

        // Re-enable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // Insert data
        DB::table('restaurants')->insert($restaurants);

        foreach (array_chunk($orders, 500) as $part) {
            DB::table('orders')->insert($part);
        }
    }
}

