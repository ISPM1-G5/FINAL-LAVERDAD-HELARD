<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Moderator Dashboard - Laravel CMS</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    @include('layouts.navigation')

    <div class="container mt-4">
        <div class="row">
            <div class="col-md-12">
                <div class="d-flex justify-content-between align-items-center">
                    <h1>Moderator Dashboard</h1>
                    <div>
                        <a href="{{ route('profile.edit') }}" class="btn btn-outline-primary me-2">Profile</a>
                        <form method="POST" action="{{ route('logout') }}" class="d-inline">
                            @csrf
                            <button type="submit" class="btn btn-outline-danger">Logout</button>
                        </form>
                    </div>
                </div>

                @if(session('success'))
                    <div class="alert alert-success">
                        {{ session('success') }}
                    </div>
                @endif

                <div class="row mt-4">
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-body text-center">
                                <h5 class="card-title">My Drafts</h5>
                                <p class="card-text">{{ \App\Models\Draft::where('user_id', Auth::id())->count() }}</p>
                                <a href="{{ route('drafts.index') }}" class="btn btn-primary">Manage Drafts</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-body text-center">
                                <h5 class="card-title">Categories</h5>
                                <p class="card-text">{{ \App\Models\Category::count() }}</p>
                                <a href="{{ route('categories.index') }}" class="btn btn-primary">View Categories</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-body text-center">
                                <h5 class="card-title">Articles</h5>
                                <p class="card-text">{{ \App\Models\Article::count() }}</p>
                                <a href="{{ route('articles.index') }}" class="btn btn-primary">View Articles</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row mt-4">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h5>My Recent Drafts</h5>
                            </div>
                            <div class="card-body">
                                <ul class="list-group list-group-flush">
                                    @foreach(\App\Models\Draft::where('user_id', Auth::id())->latest()->take(5)->get() as $draft)
                                        <li class="list-group-item d-flex justify-content-between align-items-center">
                                            {{ $draft->title }}
                                            <div>
                                                <a href="{{ route('drafts.show', $draft) }}" class="btn btn-sm btn-info">View</a>
                                                <a href="{{ route('drafts.edit', $draft) }}" class="btn btn-sm btn-warning">Edit</a>
                                            </div>
                                        </li>
                                    @endforeach
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h5>Pending Submissions</h5>
                            </div>
                            <div class="card-body">
                                <p>Submissions awaiting admin approval will appear here.</p>
                                <!-- Placeholder for pending submissions -->
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row mt-4">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <h5>Moderator Actions</h5>
                            </div>
                            <div class="card-body">
                                <a href="{{ route('drafts.create') }}" class="btn btn-success me-2">Create Draft</a>
                                <a href="{{ route('logs.index') }}" class="btn btn-secondary">View Audit Trail</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
