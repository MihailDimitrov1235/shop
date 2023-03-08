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
use App\Models\Prodcut;

use App\Http\Controllers\ProjectController;
Route::get('/project', [ProjectController::class, 'index']);
Route::post('/project', [ProjectController::class, 'store'])->middleware('auth');
Route::get('/project/{id}', [ProjectController::class, 'view']);
Route::delete('/project/{id}', [ProjectController::class, 'destroy']);


Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');


Route::post('/checkout', 'App\Http\Controllers\StripeController@checkout')->name('checkout');
Route::get('/success', 'App\Http\Controllers\StripeController@success')->name('success');