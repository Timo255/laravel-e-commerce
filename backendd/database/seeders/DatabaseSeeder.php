<?php
namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\ProductsTableSeeder;
use Database\Seeders\VariationsTableSeeder;
use Database\Seeders\ProductVariationTableSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'email' => 'test@example.com',
        //     'password' => 'Test@1234'
        // ]);
        $this->call([
            ProductsTableSeeder::class,
            VariationsTableSeeder::class,
            ProductVariationTableSeeder::class,
        ]);

    }
}
