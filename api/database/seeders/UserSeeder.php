<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::truncate();

        User::create([
            'name' => 'Admin',
            'email' => 'admin@admin.com',
            'password' => Hash::make('admin123'),
            'role_id' => 1
        ]);

        User::create([
            'name' => 'Miroslav',
            'email' => 'zevs8@abv.bg',
            'password' => Hash::make('password'),
            'role_id' => 2
        ]);

        User::factory()->count(50)->create();
    }
}
