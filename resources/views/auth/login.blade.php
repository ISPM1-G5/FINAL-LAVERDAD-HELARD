
@extends('layouts.app')

@section('title', 'Login to La Verdad Herald')

@section('content')
<div class="flex min-h-screen items-center justify-center bg-gray-100">
    <div class="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <div class="mb-6 flex justify-center">
            <img src="{{ asset('images/logo.svg') }}" alt="La Verdad Christian College Logo" class="h-20">
        </div>
        <h2 class="mb-1 text-center text-2xl font-bold text-gray-800">Welcome Back!</h2>
        <p class="mb-6 text-center text-gray-600">Sign in to continue to La Verdad Herald</p>

        <form method="POST" action="{{ route('login') }}">
            @csrf

            <div class="mb-4">
                <label for="email" class="mb-2 block text-sm font-medium text-gray-700">Email Address</label>
                <input type="email" id="email" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus
                       class="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 @error('email') border-red-500 @enderror">
                @error('email')
                    <p class="mt-1 text-xs text-red-500">{{ $message }}</p>
                @enderror
            </div>

            <div class="mb-6">
                <label for="password" class="mb-2 block text-sm font-medium text-gray-700">Password</label>
                <input type="password" id="password" name="password" required autocomplete="current-password"
                       class="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-5