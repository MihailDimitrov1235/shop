<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
use App\Models\Project;
Route::get('/', function () {
    $projects = [
        [
            'ProjectName' => 'Premium', 
            'Name' => 'premium', 
            'stripe_plan' => 'price_1LmB1SCXbPPKAWayGsb1DAkq', 
            'ShortDescriptionBG' => "cock", 
            'DescriptionBG' => 'Premium'
        ],
        [
            'ProjectName' => 'Premium', 
            'Name' => 'premium', 
            'stripe_plan' => 'price_1LnwbTCXbPPKAWay3ByKpcfq', 
            'ShortDescriptionBG' => "cock", 
            'DescriptionBG' => 'Premium'
        ]
    ];

    foreach ($projects as $project) {
        Project::create($project);
    }
    return view('welcome');
    
});

use App\Http\Controllers\ProjectController;
Route::get('/project', [ProjectController::class, 'index']);
Route::post('/project', [ProjectController::class, 'store'])->middleware('auth');
Route::get('/project/{id}', [ProjectController::class, 'view']);
Route::delete('/project/{id}', [ProjectController::class, 'destroy']);

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');


