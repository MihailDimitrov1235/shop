<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\PaymentController;

Route::post('/payment', [PaymentController::class, 'pay'])->middleware('auth');

Route::get('/project', [ProjectController::class, 'index']);
Route::post('/project', [ProjectController::class, 'store'])->middleware('auth');
Route::get('/project/{id}', [ProjectController::class, 'view']);
Route::delete('/project/{id}', [ProjectController::class, 'destroy']);