<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\{
    Category,
    CategoryTrans
};

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Category::factory()
                ->count(10)
                ->has(CategoryTrans::factory(2)->sequence(['lang' => 'bg'], ['lang' => 'en']), 'trans')
                ->create();
    }
}
