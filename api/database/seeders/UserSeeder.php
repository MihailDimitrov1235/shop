<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\{
    User,
    Role
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
        User::truncate();

        User::create([
            'name' => 'Admin',
            'email' => 'admin@admin.com',
            'password' => Hash::make('admin123'),
            'role_id' => Role::where('name', 'Admin')->first()->id
        ]);

        User::create([
            'name' => 'Miroslav',
            'email' => 'zevs8@abv.bg',
            'password' => Hash::make('password'),
            'role_id' => Role::where('name', 'User')->first()->id
        ]);

        User::factory()->count(50)->create();
    }
}
