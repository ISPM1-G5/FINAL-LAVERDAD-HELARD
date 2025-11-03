@extends('layouts.navigation')

@section('content')
<div class="container">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h1>Authors</h1>
        <a href="{{ route('authors.create') }}" class="btn btn-primary">Create Author</a>
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
                            <th>Name</th>
                            <th>Email</th>
                            <th>Bio</th>
                            <th>Website</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($authors as $author)
                            <tr>
                                <td>{{ $author->user->name }}</td>
                                <td>{{ $author->user->email }}</td>
                                <td>{{ Str::limit($author->bio, 50) }}</td>
                                <td>{{ $author->website }}</td>
                                <td>
                                    <a href="{{ route('authors.show', $author) }}" class="btn btn-sm btn-info">View</a>
                                    <a href="{{ route('authors.edit', $author) }}" class="btn btn-sm btn-warning">Edit</a>
                                    <form method="POST" action="{{ route('authors.destroy', $author) }}" style="display: inline;">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="btn btn-sm btn-danger" onclick="return confirm('Are you sure?')">Delete</button>
                                    </form>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
            {{ $authors->links() }}
        </div>
    </div>
</div>
@endsection
