@extends('layouts.navigation')

@section('content')
<div class="container">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h1>Staff</h1>
        <a href="{{ route('staff.create') }}" class="btn btn-primary">Create Staff</a>
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
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($staff as $member)
                            <tr>
                                <td>{{ $member->user->name }}</td>
                                <td>{{ $member->user->email }}</td>
                                <td>
                                    <span class="badge bg-{{ $member->role === 'admin' ? 'danger' : ($member->role === 'moderator' ? 'warning' : 'info') }}">
                                        {{ ucfirst($member->role) }}
                                    </span>
                                </td>
                                <td>
                                    <a href="{{ route('staff.edit', $member) }}" class="btn btn-sm btn-warning">Edit</a>
                                    <form method="POST" action="{{ route('staff.destroy', $member) }}" style="display: inline;">
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
            {{ $staff->links() }}
        </div>
    </div>
</div>
@endsection
