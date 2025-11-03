@extends('layouts.navigation')

@section('content')
<div class="container">
    <div class="card">
        <div class="card-header">
            <div class="d-flex justify-content-between align-items-center">
                <h4>Log Details</h4>
                <a href="{{ route('logs.index') }}" class="btn btn-secondary">Back to Logs</a>
            </div>
        </div>
        <div class="card-body">
            <div class="row mb-3">
                <div class="col-md-3"><strong>User:</strong></div>
                <div class="col-md-9">{{ $log->user->name }}</div>
            </div>

            <div class="row mb-3">
                <div class="col-md-3"><strong>Action:</strong></div>
                <div class="col-md-9">{{ ucfirst($log->action) }}</div>
            </div>

            <div class="row mb-3">
                <div class="col-md-3"><strong>Model Type:</strong></div>
                <div class="col-md-9">{{ $log->model_type }}</div>
            </div>

            <div class="row mb-3">
                <div class="col-md-3"><strong>Model ID:</strong></div>
                <div class="col-md-9">{{ $log->model_id }}</div>
            </div>

            <div class="row mb-3">
                <div class="col-md-3"><strong>Created At:</strong></div>
                <div class="col-md-9">{{ $log->created_at->format('M d, Y H:i:s') }}</div>
            </div>

            @if($log->old_values)
                <div class="row mb-3">
                    <div class="col-md-3"><strong>Old Values:</strong></div>
                    <div class="col-md-9">
                        <pre>{{ json_encode($log->old_values, JSON_PRETTY_PRINT) }}</pre>
                    </div>
                </div>
            @endif

            @if($log->new_values)
                <div class="row mb-3">
                    <div class="col-md-3"><strong>New Values:</strong></div>
                    <div class="col-md-9">
                        <pre>{{ json_encode($log->new_values, JSON_PRETTY_PRINT) }}</pre>
                    </div>
                </div>
            @endif
        </div>
    </div>
</div>
@endsection
