<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::get('/', function () {
    return view('about.modal');
});

// Auth::routes(); // This requires the laravel/ui package.

// Manually defining the authentication routes to avoid the dependency on laravel/ui.
// You can later install laravel/ui and revert to Auth::routes() if you prefer.
Route::group(['namespace' => 'App\Http\Controllers'], function () {
    // Authentication Routes...
    Route::get('login', [AuthController::class, 'showLoginForm'])->name('login');
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout'])->name('logout');

    // Registration Routes...
    Route::get('register', [AuthController::class, 'showRegistrationForm'])->name('register');
    Route::post('register', [AuthController::class, 'register']);
});

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
