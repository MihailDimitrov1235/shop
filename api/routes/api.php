<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
use App\Http\Controllers\ProjectController;
Route::get('/project', [ProjectController::class, 'index']);
Route::post('/project', [ProjectController::class, 'store'])->middleware('auth');
Route::get('/project/{id}', [ProjectController::class, 'view']);
Route::delete('/project/{id}', [ProjectController::class, 'destroy']);