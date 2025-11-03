@extends('layouts.navigation')

@section('content')
<div class="container">
    <h1>Activity Logs</h1>

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
                            <th>User</th>
                            <th>Action</th>
                            <th>Model</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($logs as $log)
                            <tr>
                                <td>{{ $log->user->name }}</td>
                                <td>{{ ucfirst($log->action) }}</td>
                                <td>{{ $log->model_type }}</td>
                                <td>{{ $log->created_at->format('M d, Y H:i') }}</td>
                                <td>
                                    <a href="{{ route('logs.show', $log) }}" class="btn btn-sm btn-info">View Details</a>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
            {{ $logs->links() }}
        </div>
    </div>
</div>
@endsection
