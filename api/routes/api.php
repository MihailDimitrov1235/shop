<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{
    UserController,
    ProjectController,
    PaymentController,
    AdminController
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

        Route::post('/', [UserController::class, 'store']);
        Route::put('/{id}', [UserController::class, 'edit']);
        Route::delete('/', [UserController::class, 'delete']);
        
        Route::get('/{id}', [UserController::class, 'getById']);
    });

    Route::prefix('admins')->group(function () {
        Route::get('/', [AdminController::class, 'index']);
        Route::post('/', [AdminController::class, 'store']);
        Route::delete('/', [AdminController::class, 'delete']);
        Route::put('/{id}', [AdminController::class, 'edit']);
        Route::get('/{id}', [AdminController::class, 'getById']);
    });
});

Route::prefix('products')->group(function () {
    Route::get('/', [ProjectController::class, 'index']);
    Route::post('/', [ProjectController::class, 'store'])->middleware('auth');
    Route::delete('/{id}', [ProjectController::class, 'destroy']);
    Route::get('/{id}', [ProjectController::class, 'view']);
});