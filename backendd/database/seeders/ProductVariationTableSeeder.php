<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductVariationTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('product_variation')->insert([
            ['variation_id' => 1, 'product_id' => 1, 'created_at' => '2025-03-17 06:54:53', 'updated_at' => '2025-03-17 06:54:53'],
            ['variation_id' => 1, 'product_id' => 10, 'created_at' => '2025-03-17 06:54:53', 'updated_at' => '2025-03-17 06:54:53'],
            ['variation_id' => 2, 'product_id' => 10, 'created_at' => '2025-03-17 06:54:53', 'updated_at' => '2025-03-17 06:54:53'],
            ['variation_id' => 2, 'product_id' => 1, 'created_at' => '2025-03-17 06:54:53', 'updated_at' => '2025-03-17 06:54:53'],
            ['variation_id' => 3, 'product_id' => 2, 'created_at' => '2025-03-17 06:54:53', 'updated_at' => '2025-03-17 06:54:53'],
            ['variation_id' => 3, 'product_id' => 11, 'created_at' => '2025-03-17 06:54:53', 'updated_at' => '2025-03-17 06:54:53'],
            ['variation_id' => 3, 'product_id' => 12, 'created_at' => '2025-03-17 06:54:53', 'updated_at' => '2025-03-17 06:54:53'],
            ['variation_id' => 4, 'product_id' => 11, 'created_at' => '2025-03-17 06:54:53', 'updated_at' => '2025-03-17 06:54:53'],
            ['variation_id' => 4, 'product_id' => 2, 'created_at' => '2025-03-17 06:54:53', 'updated_at' => '2025-03-17 06:54:53'],
            ['variation_id' => 4, 'product_id' => 12, 'created_at' => '2025-03-17 06:54:53', 'updated_at' => '2025-03-17 06:54:53'],
            ['variation_id' => 5, 'product_id' => 2, 'created_at' => '2025-03-17 06:54:53', 'updated_at' => '2025-03-17 06:54:53'],
            ['variation_id' => 5, 'product_id' => 11, 'created_at' => '2025-03-17 06:54:53', 'updated_at' => '2025-03-17 06:54:53'],
            ['variation_id' => 5, 'product_id' => 12, 'created_at' => '2025-03-17 06:54:53', 'updated_at' => '2025-03-17 06:54:53'],
            ['variation_id' => 6, 'product_id' => 3, 'created_at' => '2025-03-17 06:54:53', 'updated_at' => '2025-03-17 06:54:53'],
            ['variation_id' => 6, 'product_id' => 13, 'created_at' => '2025-03-17 06:54:53', 'updated_at' => '2025-03-17 06:54:53'],
            ['variation_id' => 7, 'product_id' => 3, 'created_at' => '2025-03-17 06:54:53', 'updated_at' => '2025-03-17 06:54:53'],
            ['variation_id' => 7, 'product_id' => 13, 'created_at' => '2025-03-17 06:54:53', 'updated_at' => '2025-03-17 06:54:53'],
            ['variation_id' => 8, 'product_id' => 4, 'created_at' => '2025-03-17 06:54:53', 'updated_at' => '2025-03-17 06:54:53'],
            ['variation_id' => 8, 'product_id' => 14, 'created_at' => '2025-03-17 06:54:53', 'updated_at' => '2025-03-17 06:54:53'],
            ['variation_id' => 8, 'product_id' => 15, 'created_at' => '2025-03-17 06:54:53', 'updated_at' => '2025-03-17 06:54:53'],
            ['variation_id' => 9, 'product_id' => 4, 'created_at' => '2025-03-17 06:54:53', 'updated_at' => '2025-03-17 06:54:53'],
            ['variation_id' => 9, 'product_id' => 14, 'created_at' => '2025-03-17 06:54:53', 'updated_at' => '2025-03-17 06:54:53'],
            ['variation_id' => 9, 'product_id' => 15, 'created_at' => '2025-03-17 06:54:53', 'updated_at' => '2025-03-17 06:54:53'],
            ['variation_id' => 10, 'product_id' => 4, 'created_at' => '2025-03-17 06:54:53', 'updated_at' => '2025-03-17 06:54:53'],
            ['variation_id' => 10, 'product_id' => 14, 'created_at' => '2025-03-17 06:54:53', 'updated_at' => '2025-03-17 06:54:53'],
            ['variation_id' => 10, 'product_id' => 15, 'created_at' => '2025-03-17 06:54:53', 'updated_at' => '2025-03-17 06:54:53'],
            ['variation_id' => 11, 'product_id' => 5, 'created_at' => '2025-03-17 06:54:53', 'updated_at' => '2025-03-17 06:54:53'],
            ['variation_id' => 11, 'product_id' => 16, 'created_at' => '2025-03-17 06:54:53', 'updated_at' => '2025-03-17 06:54:53'],
            ['variation_id' => 12, 'product_id' => 5, 'created_at' => '2025-03-17 06:54:53', 'updated_at' => '2025-03-17 06:54:53'],
            ['variation_id' => 12, 'product_id' => 16, 'created_at' => '2025-03-17 06:54:53', 'updated_at' => '2025-03-17 06:54:53'],
            ['variation_id' => 13, 'product_id' => 6, 'created_at' => '2025-03-17 06:54:53', 'updated_at' => '2025-03-17 06:54:53'],
            ['variation_id' => 13, 'product_id' => 17, 'created_at' => '2025-03-17 06:54:53', 'updated_at' => '2025-03-17 06:54:53'],
            ['variation_id' => 13, 'product_id' => 18, 'created_at' => '2025-03-17 06:54:53', 'updated_at' => '2025-03-17 06:54:53'],
            ['variation_id' => 14, 'product_id' => 6, 'created_at' => '2025-03-17 06:54:53', 'updated_at' => '2025-03-17 06:54:53'],
            ['variation_id' => 14, 'product_id' => 17, 'created_at' => '2025-03-17 06:54:53', 'updated_at' => '2025-03-17 06:54:53'],
            ['variation_id' => 14, 'product_id' => 18, 'created_at' => '2025-03-17 06:54:53', 'updated_at' => '2025-03-17 06:54:53'],
            ['variation_id' => 15, 'product_id' => 6, 'created_at' => '2025-03-17 06:54:53', 'updated_at' => '2025-03-17 06:54:53'],
            ['variation_id' => 15, 'product_id' => 17, 'created_at' => '2025-03-17 06:54:53', 'updated_at' => '2025-03-17 06:54:53'],
            ['variation_id' => 15, 'product_id' => 18, 'created_at' => '2025-03-17 06:54:53', 'updated_at' => '2025-03-17 06:54:53'],
            ['variation_id' => 16, 'product_id' => 7, 'created_at' => '2025-03-17 06:54:53', 'updated_at' => '2025-03-17 06:54:53'],
            ['variation_id' => 16, 'product_id' => 19, 'created_at' => '2025-03-17 06:54:53', 'updated_at' => '2025-03-17 06:54:53'],
            ['variation_id' => 17, 'product_id' => 7, 'created_at' => '2025-03-17 06:54:53', 'updated_at' => '2025-03-17 06:54:53'],
            ['variation_id' => 17, 'product_id' => 19, 'created_at' => '2025-03-17 06:54:53', 'updated_at' => '2025-03-17 06:54:53'],
            ['variation_id' => 18, 'product_id' => 8, 'created_at' => '2025-03-17 06:54:53', 'updated_at' => '2025-03-17 06:54:53'],
            ['variation_id' => 18, 'product_id' => 20, 'created_at' => '2025-03-17 06:54:53', 'updated_at' => '2025-03-17 06:54:53'],
            ['variation_id' => 21, 'product_id' => 21, 'created_at' => '2025-05-14 10:56:31', 'updated_at' => '2025-05-14 10:56:31'],
            ['variation_id' => 20, 'product_id' => 9, 'created_at' => '2025-05-14 10:59:14', 'updated_at' => '2025-05-14 10:59:14'],
            ['variation_id' => 20, 'product_id' => 21, 'created_at' => '2025-05-14 11:09:05', 'updated_at' => '2025-05-14 11:09:05'],
            ['variation_id' => 21, 'product_id' => 9, 'created_at' => '2025-05-14 11:09:25', 'updated_at' => '2025-05-14 11:09:25'],
            ['variation_id' => 19, 'product_id' => 20, 'created_at' => '2025-05-18 18:56:08', 'updated_at' => '2025-05-18 18:56:08'],
            ['variation_id' => 19, 'product_id' => 8, 'created_at' => '2025-05-18 18:56:58', 'updated_at' => '2025-05-18 18:56:58']
        ]);
    }
}
