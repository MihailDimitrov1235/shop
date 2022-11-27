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
Route::get('/', function () {
    return view('welcome');
});

use App\Http\Controllers\ProjectController;
Route::get('/project', [ProjectController::class, 'index']);
Route::get('/project/create', [ProjectController::class, 'create']);
Route::post('/project', [ProjectController::class, 'store']);
Route::get('/project/{id}', [ProjectController::class, 'view']);
Route::delete('/project/{id}', [ProjectController::class, 'destroy']);


Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');


