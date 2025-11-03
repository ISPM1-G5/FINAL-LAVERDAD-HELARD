@extends('layouts.navigation')

@section('content')
<div class="container">
    <div class="card">
        <div class="card-header">
            <div class="d-flex justify-content-between align-items-center">
                <h4>{{ $draft->title }}</h4>
                <div>
                    <a href="{{ route('drafts.edit', $draft) }}" class="btn btn-warning btn-sm">Edit</a>
                    <a href="{{ route('drafts.index') }}" class="btn btn-secondary btn-sm">Back to Drafts</a>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="mb-3">
                <strong>Created At:</strong> {{ $draft->created_at->format('M d, Y H:i') }}
            </div>

            <div class="mb-3">
                <strong>Last Updated:</strong> {{ $draft->updated_at->format('M d, Y H:i') }}
            </div>

            <div>
                <strong>Content:</strong>
                <div class="mt-2">
                    {!! nl2br(e($draft->content)) !!}
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
