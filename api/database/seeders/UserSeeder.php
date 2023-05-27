<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use App\Models\{
    Author,
    AuthorTrans,
    Blogger,
    BloggerTrans,
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

        // ADMIN 
        User::create([
            'name' => 'Admin',
            'email' => 'admin@admin.com',
            'password' => Hash::make('admin123'),
            'role_id' => Role::where('name', 'Admin')->first()->id
        ]);

        Cart::create(['user_id' => 1]);

        // // AUTHOR
        // User::create([
        //     'name' => 'author',
        //     'email' => 'author@author.com',
        //     'password' => Hash::make('author123'),
        //     'role_id' => Role::where('name', 'Author')->first()->id
        // ]);
        // Author::create([
        //     'phone' => "0808080808",
        //     'user_id' => 2,
        // ]);
        // AuthorTrans::create([
        //     'name' => "Име на автора",
        //     'author_id' => 1,
        //     'lang' => 'bg'
        // ]);
        // AuthorTrans::create([
        //     'name' => "AuthorName",
        //     'author_id' => 1,
        //     'lang' => "en"
        // ]);
        // Cart::create(['user_id' => 2]);

        // NORMAL USER
        User::create([
            'name' => 'Miroslav',
            'email' => 'zevs8@abv.bg',
            'password' => Hash::make('password'),
            'role_id' => Role::where('name', 'User')->first()->id
        ]);
        Cart::create(['user_id' => 2]);

        // BLOGGER
        User::create([
            'name' => 'Blogger',
            'email' => 'blogger@blogger.com',
            'password' => Hash::make('blogger123'),
            'role_id' => Role::where('name', 'Blogger')->first()->id
        ]);
        Blogger::create([
            'phone' => "0878787878",
            'links' => "{}",
            'image_path' => "image_path",
            'user_id' => 3,
        ]);
        BloggerTrans::create([
            'name' => "име на блогара",
            'occupation' => "с какво се занимава блогара",
            'description' => "описание на блогара",
            'blogger_id' => 1,
            'lang' => "bg"
        ]);
        BloggerTrans::create([
            'name' => "bloggerName",
            'occupation' => "BloggerOcupation",
            'description' => "BloggerDescription",
            'blogger_id' => 1,
            'lang' => "en"
        ]);
        Cart::create(['user_id' => 3]);



        User::factory()->hasCart()->count(50)->create();
    }
}
