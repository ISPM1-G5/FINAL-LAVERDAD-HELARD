@extends('layouts.app') {{-- Or your main layout file --}}

@section('title', 'Welcome to La Verdad Herald')

@section('content')
<style>
    .hero-background {
        background-image: linear-gradient(to bottom, rgba(18, 94, 124, 0.5), rgba(0, 0, 0, 0.7)), url('{{ asset('images/bg.jpg') }}');
        background-size: cover;
        background-position: center;
    }
</style>

    <section class="hero-background flex min-h-screen flex-col items-center justify-center text-white">
        <div class="container mx-auto max-w-7xl px-4 py-10 text-center">
           <div class="mb-6 flex flex-col items-center space-y-4 py-4" >
            <img src="{{ asset('images/logo.svg') }}" alt="La Verdad Christian College Logo" class="h-auto w-48">
            <img src="{{ asset('images/la verdad herald.svg') }}" alt="La Verdad Herald" class="h-auto w-96">
            <p class="text-xl font-medium text-gray-300">
                The Official Higher Education Student Publication of La Verdad Christian College, Inc.
            </p>
           </div>
            <div class="flex justify-center space-x-2 scroll-px-20">
                <a href="{{ route('login') }}" class="px-10 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded shadow transition duration-150">
                    Log In
                </a>
                <button onclick="toggleModal('registerModal')" class="px-10 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-medium rounded shadow transition duration-150">
                    Sign Up
                </button>
            </div>
        </div>
    </section>

    {{-- Register Modal --}}
    <x-register-modal />

    <section class="py-16 bg-white">
        <div class="container mx-auto px-4 max-w-4xl text-center">
            <h2 class="text-3xl font-light text-gray-700 mb-6">
                Welcome to La Verdad Herald
            </h2>
            <p class="text-gray-600 mb-4 leading-relaxed">
                La Verdad Herald is the official digital publication platform of La Verdad Christian College, Inc.,
                committed to upholding the highest standards of student journalism. Our mission is to deliver
                **timely, accurate, and engaging news coverage** of campus events, student achievements,
                community updates, and socially relevant issues.
            </p>
            <p class="text-gray-600 leading-relaxed">
                As a student-run publication, we provide a voice for the LVCC community, fostering dialogue,
                **celebrating excellence**, and providing a means to stay informed with the latest news from
                your campus community.
            </p>
        </div>
    </section>

    <section class="py-16 bg-gray-50 border-t border-gray-200">
        <div class="container mx-auto px-4 text-center">
            <h2 class="text-3xl font-light text-gray-700 mb-4">
                Latest Articles
            </h2>
            <p class="text-sm text-gray-500 mb-8">
                Sign in to read the full articles.
            </p>

            <div class="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
                @forelse ($latestArticles ?? [] as $article)
                    <div class="transform rounded-lg bg-white p-4 text-left shadow-md transition-shadow duration-300 hover:shadow-lg">
                        <div class="mb-4 flex h-48 w-full items-center justify-center overflow-hidden rounded bg-gray-200">
                            {{-- You can place an article image here --}}
                            {{-- <img src="{{ $article->image_url }}" alt="{{ $article->title }}" class="h-full w-full object-cover"> --}}
                            <span class="text-sm text-gray-500">Image</span>
                        </div>
                        <h3 class="mb-1 text-sm font-semibold leading-snug text-gray-800">
                            {{ $article->title }}
                        </h3>
                        <p class="mb-2 text-xs text-gray-500 line-clamp-2">
                            {{ $article->excerpt }}
                        </p>
                        <span class="text-xs text-blue-600 font-medium">
                            {{ $article->published_at->format('M d, Y') }}
                        </span>
                    </div>
                @empty
                    <p class="text-gray-500 md:col-span-3">No articles found.</p>
                @endforelse
            </div>

            <div class="mt-12">
                <a href="{{ route('login') }}" class="px-10 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded shadow-lg transition duration-150">
                    Sign In to Read More
                </a>
            </div>
        </div>
    </section>

    <footer class="bg-gray-800 text-white p-4 text-center text-sm">
        &copy; {{ date('Y') }} La Verdad Herald. All rights reserved.
    </footer>

@endsection