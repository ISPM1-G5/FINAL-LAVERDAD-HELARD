<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('about.modal');
});

// Auth::routes(); // This requires the laravel/ui package.

// Manually defining the authentication routes to avoid the dependency on laravel/ui.
// You can later install laravel/ui and revert to Auth::routes() if you prefer.
Route::group(['namespace' => 'App\Http\Controllers\Auth'], function () {
    // Authentication Routes...
    Route::get('login', 'LoginController@showLoginForm')->name('login');
    Route::post('login', 'LoginController@login');
    Route::post('logout', 'LoginController@logout')->name('logout');

    // Registration Routes...
    Route::get('register', 'RegisterController@showRegistrationForm')->name('register');
    Route::post('register', 'RegisterController@register');
});

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
