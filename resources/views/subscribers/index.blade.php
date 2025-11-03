@extends('layouts.navigation')

@section('content')
<div class="container">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h1>Subscribers</h1>
        <a href="{{ route('subscribers.create') }}" class="btn btn-primary">Create Subscriber</a>
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
                            <th>Status</th>
                            <th>Subscribed At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($subscribers as $subscriber)
                            <tr>
                                <td>{{ $subscriber->name }}</td>
                                <td>{{ $subscriber->email }}</td>
                                <td>
                                    <span class="badge bg-{{ $subscriber->is_active ? 'success' : 'danger' }}">
                                        {{ $subscriber->is_active ? 'Active' : 'Inactive' }}
                                    </span>
                                </td>
                                <td>{{ $subscriber->subscribed_at->format('M d, Y') }}</td>
                                <td>
                                    <a href="{{ route('subscribers.edit', $subscriber) }}" class="btn btn-sm btn-warning">Edit</a>
                                    <form method="POST" action="{{ route('subscribers.destroy', $subscriber) }}" style="display: inline;">
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
            {{ $subscribers->links() }}
        </div>
    </div>
</div>
@endsection
