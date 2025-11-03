@extends('layouts.app') {{-- Or your main layout file --}}

@section('content')
<style>
    .hero-background {
        background-image: linear-gradient(rgba(18, 94, 124, 0.5), rgba(0, 0, 0, 0.7)), url('{{ asset('images/bg.jpg') }}');
        background-size: cover;
        background-position: center;
    }
</style>

    <section class="hero-background text-white relative flex flex-col items-center justify-center min-h-screen">
        <div class="container mx-auto px-4 text-center max-w-7xl py-10">
           <div class="mb-6 flex flex-col items-center py-4 space-y-4" >
            <img src="{{ asset('images/logo.svg') }}" alt="La Verdad Christian College Logo" class="h-70 w-70 md:h-70 md:w-70">
            <img src="{{ asset('images/la verdad herald.svg') }}" alt="La Verdad Herald" class="h-90 w-90 md:h-90 md:w-90">
            <p class="text-xl font-medium text-gray-300">
                The Official Higher Education Student Publication of La Verdad Christian College, Inc.
            </p>
           </div>
            <div class="flex justify-center space-x-2 scroll-px-20">
                <a href="{{ route('login') }}" class="px-10 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded shadow transition duration-150">
                    Log In
                </a>
                <a href="{{ route('register') }}" class="px-10 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-medium rounded shadow transition duration-150">
                    Sign Up
                </a>
            </div>
        </div>


    </section>

    {{-- Register Modal --}}
    <div id="registerModal" class="fixed inset-0 z-50 hidden bg-gray-900 bg-opacity-75 transition-opacity" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="fixed inset-0 overflow-y-auto">
            <div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md">
                    <button type="button" class="absolute top-3 right-3 text-gray-400 hover:text-gray-600 focus:outline-none" onclick="toggleModal('registerModal')">
                        <span class="sr-only">Close</span>
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div class="px-6 pt-8 pb-4 sm:p-6 sm:pb-4">
                        <div class="flex flex-col items-center">
                            {{-- Replace with your circular logo --}}
                            <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                                {{-- Placeholder Icon (Adjust as needed) --}}
                                <svg class="h-6 w-6 text-blue-800" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-10.5h.375c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125h-.375M2.25 12h.375c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125H2.25M10.5 5.25h.375c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125h-.375M10.5 12h.375c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125h-.375M4.5 19.5h.375c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125h-.375" />
                                </svg>
                            </div>
                            <h3 class="mt-4 text-lg font-semibold leading-6 text-gray-900" id="modal-title">Create Your Account</h3>
                            <p class="mt-2 text-sm text-gray-500">Join the La Verdad Herald community.</p>
                        </div>
                    </div>

                    <form method="POST" action="{{ route('register') }}" class="px-4 py-3 sm:px-6 sm:py-4">
                        @csrf
                        <div class="space-y-4">
                            <input type="text" name="name" placeholder="Full Name" required class="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50">
                            <input type="email" name="email" placeholder="Email Address" required class="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50">
                            <input type="password" name="password" placeholder="Password" required class="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50">
                            <input type="password" name="password_confirmation" placeholder="Confirm Password" required class="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50">
                            <div class="flex items-center">
                                <input id="terms" name="terms" type="checkbox" required class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600">
                                <label for="terms" class="ml-2 block text-sm text-gray-900">
                                    I agree to the 
                                    <a href="#" class="text-blue-600 hover:text-blue-500 font-medium">Terms of Service</a>
                                </label>
                            </div>
                        </div>
                        <button type="submit" class="mt-6 inline-flex w-full justify-center rounded-md border border-transparent bg-yellow-500 px-4 py-2 text-base font-semibold text-blue-800 shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 sm:text-lg">
                            Sign Up
                        </button>
                        <div class="mt-4 text-center text-sm">
                            <p class="text-gray-500">
                                Already have an account? 
                                <a href="#" class="font-medium text-blue-600 hover:text-blue-500" onclick="toggleModal('registerModal'); /* toggleModal('loginModal'); */ return false;">Log In</a>
                            </p>
                        </div>
                        {{-- Optional: Social Sign-In --}}
                        <div class="mt-4">
                            <div class="relative">
                                <div class="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div class="w-full border-t border-gray-300"></div>
                                </div>
                                <div class="relative flex justify-center text-sm">
                                    <span class="bg-white px-2 text-gray-500">Or continue with</span>
                                </div>
                            </div>
                            <button type="button" class="mt-4 flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                                <svg class="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"></svg>
                                Sign up with Google
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

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

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                
                @for ($i = 1; $i <= 6; $i++)
                    <div class="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-left">
                        <div class="w-full h-48 mb-4 rounded overflow-hidden bg-gray-200 flex items-center justify-center">
                            <span class="text-sm text-gray-500">
                                                            </span>
                        </div>
                        
                        <h3 class="text-sm font-semibold text-gray-800 mb-1 leading-snug">
                            @if ($i == 1)
                                The One Who Bold the Light
                            @elseif ($i == 2)
                                MULTI-RICH-WIDE-WORD-DOCU-MANTARY-ABOUT-GOV-PH
                            @elseif ($i == 3)
                                OFFICIAL DEIPNOSOPHISM
                            @else
                                Placeholder Article Title {{ $i }}
                            @endif
                        </h3>
                        
                        <p class="text-xs text-gray-500 mb-2 line-clamp-2">
                            A short descriptive text or excerpt from the article goes here.
                        </p>
                        
                        <span class="text-xs text-blue-600 font-medium">
                            {{ date('M d, Y', strtotime('-' . $i . ' days')) }}
                        </span>
                    </div>
                @endfor

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