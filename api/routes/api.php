<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{
    UserController,
    ProductController,
    PaymentController,
    AdminController,
    CategoryController,
    AuthorController,
    StripeController,
    CartController
};

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/payment', [PaymentController::class, 'pay'])->middleware('auth');

Route::post('/users/login', [UserController::class, 'login']);
Route::post('/users/register', [UserController::class, 'register']);

Route::post('/checkout', [StripeController::class, 'checkout']);
Route::get('/success', [StripeController::class, 'success']);

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

    Route::prefix('products')->group(function () {
        Route::post('/', [ProductController::class, 'store']);
        Route::post('/upload', [ProductController::class, 'uploadFiles']);
        Route::delete('/', [ProductController::class, 'delete']);
        Route::put('/{id}', [ProductController::class, 'edit']);
    });

    Route::prefix('categories')->group(function () {
        Route::post('/', [CategoryController::class, 'store']);
        Route::delete('/', [CategoryController::class, 'delete']);
        Route::put('/{id}', [CategoryController::class, 'edit']);
    });

    Route::prefix('authors')->group(function () {
        Route::post('/', [AuthorController::class, 'store']);
        Route::delete('/', [AuthorController::class, 'delete']);
        Route::put('/{id}', [AuthorController::class, 'edit']);
    });

    Route::prefix('cart')->group(function () {
        Route::post('/add', [CartController::class, 'addProduct']);
        Route::delete('/remove/{id}', [CartController::class, 'removeProduct']);
    });
});

Route::prefix('categories')->group(function () {
    Route::get('/', [CategoryController::class, 'index']);
    Route::get('/all', [CategoryController::class, 'getAll']);
    Route::get('/{id}', [CategoryController::class, 'getById']);
});

Route::prefix('authors')->group(function () {
    Route::get('/', [AuthorController::class, 'index']);
    Route::get('/all', [AuthorController::class, 'getAll']);
    Route::get('/{id}', [AuthorController::class, 'getById']);
});

Route::prefix('products')->group(function () {
    Route::get('/', [ProductController::class, 'index']);
    Route::get('/{id}', [ProductController::class, 'getById']);
});