@extends('layouts.navigation')

@section('content')
<div class="container">
    <h1>Search Results</h1>
    <p class="text-muted">Showing results for: "{{ $q }}"</p>

    @if($q && $articles->count())
        <div class="list-group">
            @foreach($articles as $a)
                <a href="{{ route('public.articles.show', $a->slug) }}" class="list-group-item list-group-item-action">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">{{ $a->title }}</h5>
                        <small>{{ $a->published_at?->format('M d, Y') }}</small>
                    </div>
                    <p class="mb-1">{{ Str::limit($a->excerpt ?? strip_tags($a->content), 140) }}</p>
                    <small>
                        @foreach($a->categories as $c)
                            <span class="badge bg-secondary">{{ $c->name }}</span>
                        @endforeach
                    </small>
                </a>
            @endforeach
        </div>

        <div class="mt-3">
            {{ $articles->withQueryString()->links() }}
        </div>
    @elseif($q)
        <div class="alert alert-warning">No results found.</div>
    @endif
</div>
@endsection


