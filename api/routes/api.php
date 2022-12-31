<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{
    UserController,
    ProjectController,
    PaymentController
};

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/payment', [PaymentController::class, 'pay'])->middleware('auth');

Route::post('/users/login', [UserController::class, 'login']);
Route::post('/users/register', [UserController::class, 'register']);

Route::middleware('auth:sanctum')->group(function() {
    Route::prefix('users')->group(function() {
        Route::get('/', [UserController::class, 'index']);
        Route::get('/profile', [UserController::class, 'profile']);
        Route::post('/logout', [UserController::class, 'logout']);

        Route::put('/{id}', [UserController::class, 'edit']);
        Route::delete('/', [UserController::class, 'delete']);
    });
});

Route::prefix('products')->group(function () {
    Route::get('/', [ProjectController::class, 'index']);
    Route::post('/', [ProjectController::class, 'store'])->middleware('auth');
    Route::delete('/{id}', [ProjectController::class, 'destroy']);
    Route::get('/{id}', [ProjectController::class, 'view']);
});