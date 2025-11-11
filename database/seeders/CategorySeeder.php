<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::firstOrCreate(['name' => 'Technology'], ['description' => 'Articles about technology']);
        Category::firstOrCreate(['name' => 'Science'], ['description' => 'Articles about science']);
        Category::firstOrCreate(['name' => 'Health'], ['description' => 'Articles about health']);
        Category::firstOrCreate(['name' => 'Business'], ['description' => 'Articles about business']);
        Category::firstOrCreate(['name' => 'Culture'], ['description' => 'Articles about culture']);
    }
}
