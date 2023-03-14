<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Role::updateOrCreate(['name' => 'Admin'],[
			'name' => 'Admin'
		]);

        Role::updateOrCreate(['name' => 'Author'],[
			'name' => 'Author'
		]);

        Role::updateOrCreate(['name' => 'User'], [
            'name' => 'User'
        ]);
    }
}
