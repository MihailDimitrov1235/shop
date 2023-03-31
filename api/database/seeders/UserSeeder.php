<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use App\Models\{
    User,
    Role,
    Cart
};

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        User::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        User::create([
            'name' => 'Admin',
            'email' => 'admin@admin.com',
            'password' => Hash::make('admin123'),
            'role_id' => Role::where('name', 'Admin')->first()->id
        ]);

        Cart::create(['user_id' => 1]);

        User::create([
            'name' => 'Miroslav',
            'email' => 'zevs8@abv.bg',
            'password' => Hash::make('password'),
            'role_id' => Role::where('name', 'User')->first()->id
        ]);

        Cart::create(['user_id' => 2]);

        User::factory()->hasCart()->count(50)->create();
    }
}
