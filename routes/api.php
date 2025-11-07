<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\SubscriberController;
use App\Http\Controllers\LogController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\DraftController;
use App\Http\Controllers\UserController;
use App\Models\Category;
use App\Models\Article;
use App\Http\Controllers\AuthController;

// Public API Routes
Route::post('/login', [AuthController::class, 'loginApi']);
Route::post('/register', [AuthController::class, 'registerApi']);
Route::get('/categories', function () {
    return Category::orderBy('name')->get();
});

Route::get('/latest-articles', function () {
    return Article::published()
        ->with('author.user', 'categories')
        ->latest('published_at')
        ->take(6)
        ->get();
});

// API Routes with Sanctum authentication
Route::middleware('auth:sanctum')->group(function () {
    // User API
    Route::get('/user', function (Request $request) {
        return response()->json($request->user())
            ->header('Access-Control-Allow-Origin', 'http://localhost:5176')
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    });

    // Logout API
    Route::post('/logout', [AuthController::class, 'logoutApi']);

    // Change Password API
    Route::post('/change-password', [AuthController::class, 'changePasswordApi']);

    // Delete Account API
    Route::post('/delete-account', [AuthController::class, 'deleteAccountApi']);

    // Articles API
    Route::apiResource('articles', ArticleController::class);

    // User liked and shared articles
    Route::get('/user/liked-articles', [ArticleController::class, 'getLikedArticles']);
    Route::get('/user/shared-articles', [ArticleController::class, 'getSharedArticles']);

    // Categories API
    Route::apiResource('categories', CategoryController::class);

    // Tags API
    Route::apiResource('tags', TagController::class);

    // Subscribers API
    Route::apiResource('subscribers', SubscriberController::class);

    // Logs API
    Route::get('/logs', [LogController::class, 'index']);
    Route::get('/logs/{log}', [LogController::class, 'show']);

    // Admin API Routes
    Route::middleware(['role:admin'])->group(function () {
        Route::apiResource('staff', StaffController::class);
        Route::apiResource('authors', AuthorController::class);
        Route::apiResource('users', UserController::class);
    });

    // Moderator API Routes
    Route::middleware(['role:moderator'])->group(function () {
        Route::apiResource('drafts', DraftController::class)->except(['store']);
    });

    // Author API Routes
    Route::middleware(['role:author'])->group(function () {
        Route::apiResource('drafts', DraftController::class)->only(['index', 'show', 'store', 'update', 'destroy']);
    });
});
