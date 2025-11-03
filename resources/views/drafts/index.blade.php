@extends('layouts.navigation')

@section('content')
<div class="container">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h1>{{ Auth::user()->isAdmin() ? 'All Drafts' : 'My Drafts' }}</h1>
        @if(Auth::user()->isAdmin() || Auth::user()->isModerator())
            <a href="{{ route('drafts.create') }}" class="btn btn-primary">Create Draft</a>
        @endif
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
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($drafts as $draft)
                            <tr>
                                <td>{{ $draft->title }}</td>
                                <td>{{ $draft->created_at->format('M d, Y H:i') }}</td>
                                <td>
                                    <a href="{{ route('drafts.show', $draft) }}" class="btn btn-sm btn-info">View</a>
                                    <a href="{{ route('drafts.edit', $draft) }}" class="btn btn-sm btn-warning">Edit</a>
                                    <form method="POST" action="{{ route('drafts.destroy', $draft) }}" style="display: inline;">
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
            {{ $drafts->links() }}
        </div>
    </div>
</div>
@endsection
