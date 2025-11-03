@extends('layouts.navigation')

@section('content')
<div class="container">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h1>Articles</h1>
        <a href="{{ route('articles.create') }}" class="btn btn-primary">Create Article</a>
    </div>

    @if(session('success'))
        <div class="alert alert-success">
            {{ session('success') }}
        </div>
    @endif

    <div class="card">
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Status</th>
                            <th>Published At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($articles as $article)
                            <tr>
                                <td>{{ $article->title }}</td>
                                <td>{{ $article->author->user->name ?? 'Unknown' }}</td>
                                <td>
                                    <span class="badge bg-{{ $article->status === 'published' ? 'success' : ($article->status === 'draft' ? 'warning' : 'secondary') }}">
                                        {{ ucfirst($article->status) }}
                                    </span>
                                </td>
                                <td>{{ $article->published_at ? $article->published_at->format('M d, Y') : 'Not published' }}</td>
                                <td>
                                    <a href="{{ route('articles.show', $article) }}" class="btn btn-sm btn-info">View</a>
                                    @if(Auth::user()->isAdmin() || Auth::user()->isModerator())
                                        <a href="{{ route('articles.edit', $article) }}" class="btn btn-sm btn-warning">Edit</a>
                                    @endif
                                    @if(Auth::user()->isAdmin())
                                        <form method="POST" action="{{ route('articles.destroy', $article) }}" style="display: inline;">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" class="btn btn-sm btn-danger" onclick="return confirm('Are you sure?')">Delete</button>
                                        </form>
                                    @endif
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
            {{ $articles->links() }}
        </div>
    </div>
</div>
@endsection
