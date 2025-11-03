@extends('layouts.navigation')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8">
            <h2>My Profile</h2>

            @if(session('success'))
                <div class="alert alert-success">
                    {{ session('success') }}
                </div>
            @endif

            <div class="card mb-4">
                <div class="card-body">
                    <div class="text-center mb-3">
                        @if($user->avatar)
                            <img src="{{ asset('storage/' . $user->avatar) }}" alt="Avatar" class="rounded-circle" style="width: 150px; height: 150px; object-fit: cover;">
                        @else
                            <div class="rounded-circle bg-secondary d-inline-flex align-items-center justify-content-center" style="width: 150px; height: 150px;">
                                <span style="font-size: 60px;">{{ strtoupper(substr($user->name, 0, 1)) }}</span>
                            </div>
                        @endif
                    </div>
                    <div class="mb-3">
                        <strong>Name:</strong> {{ $user->name }}
                    </div>
                    <div class="mb-3">
                        <strong>Email:</strong> {{ $user->email }}
                    </div>
                    <div class="mb-3">
                        <strong>Role:</strong> {{ ucfirst($user->role) }}
                    </div>
                </div>
                <div class="card-footer">
                    <a href="{{ route('profile.edit') }}" class="btn btn-primary">Edit Profile</a>
                    <a href="{{ route('profile.edit') }}?action=password" class="btn btn-warning">Change Password</a>
                    <form method="POST" action="{{ route('profile.destroy') }}" style="display: inline;" onsubmit="return confirm('Are you sure you want to delete your account? This action cannot be undone.')">
                        @csrf
                        @method('DELETE')
                        <div class="mb-2 mt-2">
                            <input type="password" name="password" placeholder="Enter password to confirm" required class="form-control d-inline" style="width: 200px;">
                        </div>
                        <button type="submit" class="btn btn-danger">Delete Account</button>
                    </form>
                </div>
            </div>

            <div class="card mb-4">
                <div class="card-header">
                    <h5>Liked Articles ({{ $likedArticles->count() }})</h5>
                </div>
                <div class="card-body">
                    @if($likedArticles->count())
                        <div class="list-group">
                            @foreach($likedArticles as $article)
                                <a href="{{ route('public.articles.show', $article->slug) }}" class="list-group-item list-group-item-action">
                                    <h6 class="mb-1">{{ $article->title }}</h6>
                                    <small class="text-muted">{{ $article->published_at?->format('M d, Y') }}</small>
                                </a>
                            @endforeach
                        </div>
                    @else
                        <p class="text-muted">No liked articles yet.</p>
                    @endif
                </div>
            </div>

            <div class="card mb-4">
                <div class="card-header">
                    <h5>Shared Articles ({{ $sharedArticles->count() }})</h5>
                </div>
                <div class="card-body">
                    @if($sharedArticles->count())
                        <div class="list-group">
                            @foreach($sharedArticles as $article)
                                <a href="{{ route('public.articles.show', $article->slug) }}" class="list-group-item list-group-item-action">
                                    <h6 class="mb-1">{{ $article->title }}</h6>
                                    <small class="text-muted">{{ $article->published_at?->format('M d, Y') }}</small>
                                </a>
                            @endforeach
                        </div>
                    @else
                        <p class="text-muted">No shared articles yet.</p>
                    @endif
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
