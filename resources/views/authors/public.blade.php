@extends('layouts.navigation')

@section('content')
<div class="container">
    <h1>Articles by {{ $author->user->name }}</h1>

    @if($author->bio)
        <p class="text-muted">{{ $author->bio }}</p>
    @endif

    @if($articles->count())
        <div class="row mt-3">
            @foreach($articles as $a)
                <div class="col-md-4 mb-3">
                    <div class="card h-100">
                        @if($a->featured_image)
                            <img src="{{ asset('storage/' . $a->featured_image) }}" class="card-img-top" alt="{{ $a->title }}">
                        @endif
                        <div class="card-body">
                            <h5 class="card-title"><a href="{{ route('public.articles.show', $a->slug) }}">{{ $a->title }}</a></h5>
                            <p class="card-text">{{ Str::limit($a->excerpt ?? strip_tags($a->content), 120) }}</p>
                            <small class="text-muted">{{ $a->published_at?->format('M d, Y') }}</small>
                            <div class="mt-2">
                                @foreach($a->categories as $c)
                                    <span class="badge bg-secondary">{{ $c->name }}</span>
                                @endforeach
                            </div>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
        {{ $articles->links() }}
    @else
        <div class="alert alert-info">No articles found for this author.</div>
    @endif
</div>
@endsection

