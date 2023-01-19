<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\{
    Author,
    AuthorTrans
};

class AuthorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Author::factory()
            ->count(10)
            ->has(AuthorTrans::factory(2)->sequence([ 'lang' => 'bg' ], ['lang' => 'en']), 'trans')
            ->create();
    }
}
