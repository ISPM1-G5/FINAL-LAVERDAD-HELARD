<header>
    <div class="top-bar bg-dark text-white py-1">
        <div class="container d-flex justify-content-end">
            <small>Current Date/Time: {{ now()->format('F j, Y') }}</small>
        </div>
    </div>
    
    <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <div class="container">
            <a class="navbar-brand fw-bold fs-3" href="{{ route('home') }}">La Verdad Herald</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto fw-bold">
                    <li class="nav-item">
                        <a class="nav-link" href="{{ route('home') }}">HOME</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{ route('categories.show', 'news') }}">NEWS</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{ route('categories.show', 'sports') }}">SPORTS</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{ route('categories.show', 'literart') }}">LITERART</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{ route('categories.show', 'features') }}">FEATURES</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{ route('categories.show', 'specials') }}">SPECIALS</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{ route('categories.show', 'art') }}">ART</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{ route('categories.show', 'opinion') }}">OPINION</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{ route('contact') }}">CONTACT US</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</header>