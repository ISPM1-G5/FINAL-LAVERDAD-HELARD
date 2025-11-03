@extends('layouts.navigation')

@section('content')
<div class="bg-gray-100 text-gray-800 font-sans">
    <div class="container mx-auto px-4 py-8">
        <div class="max-w-4xl mx-auto">
            <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                @if($article->featured_image)
                    <img src="{{ asset('storage/' . $article->featured_image) }}" alt="{{ $article->title }}" class="w-full h-96 object-cover">
                @endif

                <div class="p-6 md:p-8">
                    <div class="flex justify-between items-center mb-4">
                        <div>
                            @foreach($article->categories as $category)
                                <a href="{{ route('public.category.show', $category->slug) }}" class="text-sm font-bold text-blue-600 uppercase hover:underline">{{ $category->name }}</a>
                            @endforeach
                        </div>
                        <div class="flex items-center space-x-4">
                            @auth
                                @can('update', $article)
                                    <a href="{{ route('articles.edit', $article) }}" class="text-gray-500 hover:text-blue-600" title="Edit">
                                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                    </a>
                                @endcan
                                @can('delete', $article)
                                    <form method="POST" action="{{ route('articles.destroy', $article) }}" onsubmit="return confirm('Are you sure you want to delete this article?')">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="text-gray-500 hover:text-red-600" title="Delete">
                                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                        </button>
                                    </form>
                                @endcan
                            @endauth
                        </div>
                    </div>

                    <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{{ $article->title }}</h1>

                    <div class="flex items-center text-sm text-gray-600 mb-6">
                        @if($article->author && $article->author->user)
                            <a href="{{ route('public.author.show', $article->author->user_id) }}" class="font-semibold hover:underline">{{ $article->author->user->name }}</a>
                        @else
                            <span class="font-semibold">Unknown Author</span>
                        @endif
                        <span class="mx-2">&bull;</span>
                        <span>{{ $article->published_at->format('F j, Y') }}</span>
                    </div>

                    <div class="prose max-w-none text-gray-800 text-lg leading-relaxed">
                        {!! nl2br(e($article->content)) !!}
                    </div>

                    <div class="mt-8 flex flex-wrap items-center">
                        <span class="text-gray-600 mr-4">Tags:</span>
                        @foreach($article->tags as $tag)
                            <a href="{{ route('public.tag.show', $tag->slug) }}" class="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 hover:bg-gray-300">#{{ $tag->name }}</a>
                        @endforeach
                    </div>

                    <div class="mt-8 border-t pt-6 flex items-center space-x-4">
                        <div x-data="{ copied: false }" class="relative">
                            <button @click="navigator.clipboard.writeText(window.location.href); copied = true; setTimeout(() => copied = false, 2000)" class="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-full flex items-center">
                                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.368a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path></svg>
                                Share
                            </button>
                            <div x-show="copied" x-transition:enter="transition ease-out duration-200" x-transition:enter-start="opacity-0 transform scale-90" x-transition:enter-end="opacity-100 transform scale-100" x-transition:leave="transition ease-in duration-200" x-transition:leave-start="opacity-100 transform scale-100" x-transition:leave-end="opacity-0 transform scale-90" class="absolute bottom-full mb-2 w-max bg-gray-800 text-white text-xs rounded py-1 px-2">
                                Link copied!
                            </div>
                        </div>
                        @auth
                            <form method="POST" action="{{ route('articles.like', $article->id) }}" class="inline-flex">
                                @csrf
                                <button type="submit" class="bg-red-100 hover:bg-red-200 text-red-600 font-bold py-2 px-4 rounded-full flex items-center">
                                    <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"></path></svg>
                                    Like
                                </button>
                            </form>
                        @endauth
                    </div>
                </div>
            </div>

            @if($related->count() > 0)
                <div class="mt-12">
                    <h2 class="text-2xl font-bold text-gray-900 mb-6">You may also like</h2>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        @foreach($related as $r)
                            <a href="{{ route('public.articles.show', $r->slug) }}" class="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                                @if($r->featured_image)
                                    <img src="{{ asset('storage/' . $r->featured_image) }}" class="w-full h-40 object-cover" alt="{{ $r->title }}">
                                @else
                                    <div class="w-full h-40 bg-gray-300"></div>
                                @endif
                                <div class="p-4">
                                    <h3 class="text-md font-semibold text-gray-800 mb-2">{{ $r->title }}</h3>
                                    <p class="text-sm text-gray-600">{{ $r->author->user->name ?? 'Unknown' }}</p>
                                </div>
                            </a>
                        @endforeach
                    </div>
                </div>
            @endif

        </div>
    </div>
</div>
@endsection