@extends('layouts.navigation')

@section('content')
<div class="container">
    <div class="card">
        <div class="card-header">
            <div class="d-flex justify-content-between align-items-center">
                <h4>{{ $author->user->name }}</h4>
                <div>
                    <a href="{{ route('authors.edit', $author) }}" class="btn btn-warning btn-sm">Edit</a>
                    <a href="{{ route('authors.index') }}" class="btn btn-secondary btn-sm">Back to List</a>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="row mb-3">
                <div class="col-md-3"><strong>Name:</strong></div>
                <div class="col-md-9">{{ $author->user->name }}</div>
            </div>

            <div class="row mb-3">
                <div class="col-md-3"><strong>Email:</strong></div>
                <div class="col-md-9">{{ $author->user->email }}</div>
            </div>

            <div class="row mb-3">
                <div class="col-md-3"><strong>Bio:</strong></div>
                <div class="col-md-9">{{ $author->bio }}</div>
            </div>

            <div class="row mb-3">
                <div class="col-md-3"><strong>Website:</strong></div>
                <div class="col-md-9">
                    @if($author->website)
                        <a href="{{ $author->website }}" target="_blank">{{ $author->website }}</a>
                    @else
                        N/A
                    @endif
                </div>
            </div>

            <div class="row mb-3">
                <div class="col-md-3"><strong>Social Links:</strong></div>
                <div class="col-md-9">
                    @if($author->social_links)
                        @foreach($author->social_links as $link)
                            <a href="{{ $link }}" target="_blank" class="btn btn-sm btn-outline-primary me-1">{{ basename($link) }}</a>
                        @endforeach
                    @else
                        N/A
                    @endif
                </div>
            </div>

            <div class="row mb-3">
                <div class="col-md-3"><strong>Articles:</strong></div>
                <div class="col-md-9">
                    @if($author->articles->count() > 0)
                        <ul class="list-group">
                            @foreach($author->articles as $article)
                                <li class="list-group-item">
                                    <a href="{{ route('articles.show', $article) }}">{{ $article->title }}</a>
                                    <span class="badge bg-{{ $article->status === 'published' ? 'success' : 'warning' }}">{{ ucfirst($article->status) }}</span>
                                </li>
                            @endforeach
                        </ul>
                    @else
                        No articles yet.
                    @endif
                </div>
            </div>

            <div class="row mb-3">
                <div class="col-md-3"><strong>Drafts:</strong></div>
                <div class="col-md-9">
                    @if($author->drafts->count() > 0)
                        <ul class="list-group">
                            @foreach($author->drafts as $draft)
                                <li class="list-group-item">
                                    <a href="{{ route('drafts.show', $draft) }}">{{ $draft->title }}</a>
                                </li>
                            @endforeach
                        </ul>
                    @else
                        No drafts yet.
                    @endif
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
