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
    CartController,
    PostController,
    CommentController,
    BloggerController,
    CommentLikesController,
};

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/users/login', [UserController::class, 'login']);
Route::post('/users/register', [UserController::class, 'register']);

Route::get('/checkout/success', [StripeController::class, 'success'])->name('checkout.success');
Route::get('/checkout/cancel', [StripeController::class, 'cancel'])->name('checkout.cancel');

Route::middleware('auth:sanctum')->group(function() {
    Route::prefix('users')->group(function() {
        Route::get('/', [UserController::class, 'index']);
        Route::get('/profile', [UserController::class, 'profile']);
        Route::post('/logout', [UserController::class, 'logout']);

        Route::post('/', [UserController::class, 'store']);
        Route::post('/{id}', [UserController::class, 'edit']);
        Route::put('/{id}', [UserController::class, 'editPassword']);
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
        Route::get('/{userId}', [CartController::class, 'index']);
        Route::post('/add', [CartController::class, 'addProduct']);
        Route::delete('/remove/{id}', [CartController::class, 'removeProduct']);
    });

    Route::prefix('posts')->group(function () {
        Route::post('/', [PostController::class, 'store']);
        Route::delete('/', [PostController::class, 'delete']);
        Route::put('/{id}', [PostController::class, 'edit']);
        Route::put('/visit/{id}', [PostController::class, 'incrementVisits']); // dont know if clients should have access
        Route::patch('/{id}', [PostController::class, 'approve']);
        Route::get('/requests', [PostController::class, 'getRequests']);
    });

    Route::prefix('comments')->group(function () {
        Route::post('/', [CommentController::class, 'store']);
        Route::patch('/like', [CommentLikesController::class, 'like']);
        Route::patch('/dislike', [CommentLikesController::class, 'dislike']);
        Route::delete('/clear', [CommentLikesController::class, 'clear']);
        Route::delete('/{id}', [CommentController::class, 'delete']);
        Route::put('/{id}', [CommentController::class, 'edit']);
    });

    Route::prefix('bloggers')->group(function () {
        Route::post('/', [BloggerController::class, 'store']);
        Route::delete('/', [BloggerController::class, 'delete']);
        Route::put('/{id}', [BloggerController::class, 'edit']);
        Route::patch('/{id}', [BloggerController::class, 'approve']);
        Route::get('/requests', [BloggerController::class, 'getRequests']);
    });

    Route::post('/checkout/{id}', [StripeController::class, 'checkout']);
});

Route::prefix('comments')->group(function () {
    Route::get('/{id}', [CommentController::class, 'index']);
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
    Route::get('/similar/{id}', [ProductController::class, 'similarProducts']);
    Route::get('/{id}', [ProductController::class, 'getById']);
});

Route::prefix('posts')->group(function () {
    Route::get('/', [PostController::class, 'index']);
    Route::get('/{slug}', [PostController::class, 'getBySlug']);
});

Route::prefix('bloggers')->group(function () {
    Route::get('/', [BloggerController::class, 'index']);
    Route::get('/{id}', [BloggerController::class, 'getById']);
});

// FOR TESTING !!!

Route::prefix('comments')->group(function () {
    Route::post('/', [CommentController::class, 'store']);
    Route::patch('/like', [CommentLikesController::class, 'like']);
    Route::patch('/dislike', [CommentLikesController::class, 'dislike']);
    Route::delete('/clear', [CommentLikesController::class, 'clear']);
    Route::delete('/{id}', [CommentController::class, 'delete']);
    Route::put('/{id}', [CommentController::class, 'edit']);
});

Route::prefix('bloggers')->group(function () {
    Route::post('/', [BloggerController::class, 'store']);
    Route::post('/{id}', [BloggerController::class, 'edit']); // can't send files via put
    Route::delete('/', [BloggerController::class, 'delete']);
    Route::patch('/{id}', [BloggerController::class, 'approve']);
    Route::get('/requests', [BloggerController::class, 'getRequests']);
});

Route::prefix('posts')->group(function () {
    Route::post('/', [PostController::class, 'store']);
    Route::delete('/', [PostController::class, 'delete']);
    Route::post('/{id}', [PostController::class, 'edit']); 
    Route::put('/visit/{id}', [PostController::class, 'incrementVisits']); 
    Route::get('/requests', [PostController::class, 'getRequests']);
    Route::put('/', [PostController::class, 'approve']);
});

Route::prefix('products')->group(function () {
    Route::post('/', [ProductController::class, 'store']);
    Route::post('/upload', [ProductController::class, 'uploadFiles']);
    Route::delete('/', [ProductController::class, 'delete']);
    Route::put('/{id}', [ProductController::class, 'edit']);
    Route::get('/requests', [ProductController::class, 'getRequests']);
    Route::patch('/{id}', [ProductController::class, 'approve']);
});

Route::prefix('authors')->group(function () {
    Route::post('/', [AuthorController::class, 'store']);
    Route::delete('/', [AuthorController::class, 'delete']);
    Route::put('/{id}', [AuthorController::class, 'edit']);
    Route::get('/requests', [AuthorController::class, 'getRequests']);
    Route::put('/', [AuthorController::class, 'approve']);
});
Route::post('visit', [PostController::class, 'visit']);
Route::prefix('products')->group(function () {
    Route::post('/', [ProductController::class, 'store']);
    Route::post('/upload', [ProductController::class, 'uploadFiles']);
    Route::delete('/', [ProductController::class, 'delete']);
    Route::put('/{id}', [ProductController::class, 'edit']);
    Route::patch('/{id}', [ProductController::class, 'approve']);
    Route::get('/similar', [ProductController::class, 'similarProducts']);
});