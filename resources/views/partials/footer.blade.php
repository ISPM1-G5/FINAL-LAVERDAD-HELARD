<footer class="bg-dark text-white py-5 mt-5">
    <div class="container">
        <div class="row">
            <div class="col-md-4 mb-4">
                <h5 class="fw-bold mb-3">La Verdad Herald</h5>
                <p class="small text-muted">
                    Your source for the latest news, sports, art, and opinion from around the world.
                </p>
                <a href="#" class="text-white me-2"><i class="fab fa-facebook-f"></i></a>
                <a href="#" class="text-white me-2"><i class="fab fa-twitter"></i></a>
                <a href="#" class="text-white"><i class="fab fa-instagram"></i></a>
            </div>

            <div class="col-md-8">
                <div class="row">
                    <div class="col-6 col-md-3">
                        <h6 class.blade.phptext-uppercase fw-bold mb-2">Sections</h6>
                        <ul class="list-unstyled small">
                            <li><a href="{{ route('category.show', 'news') }}" class="text-muted text-decoration-none">NEWS</a></li>
                            <li><a href="{{ route('category.show', 'sports') }}" class="text-muted text-decoration-none">SPORTS</a></li>
                            <li><a href="{{ route('category.show', 'literart') }}" class="text-muted text-decoration-none">LITERART</a></li>
                            <li><a href="{{ route('category.show', 'art') }}" class="text-muted text-decoration-none">ART</a></li>
                        </ul>
                    </div>
                    <div class="col-6 col-md-3">
                        <h6 class="text-uppercase fw-bold mb-2">More</h6>
                        <ul class="list-unstyled small">
                            <li><a href="{{ route('category.show', 'specials') }}" class="text-muted text-decoration-none">SPECIALS</a></li>
                            <li><a href="{{ route('category.show', 'features') }}" class="text-muted text-decoration-none">FEATURES</a></li>
                            <li><a href="{{ route('category.show', 'opinion') }}" class="text-muted text-decoration-none">OPINION</a></li>
                        </ul>
                    </div>
                    <div class="col-12 col-md-6">
                        <h6 class="text-uppercase fw-bold mb-2">Info</h6>
                        <ul class="list-unstyled small">
                            <li><a href="{{ route('about') }}" class="text-muted text-decoration-none">ABOUT</a></li>
                            <li><a href="{{ route('contact') }}" class="text-muted text-decoration-none">CONTACT US</a></li>
                            <li><a href="{{ route('privacy') }}" class="text-muted text-decoration-none">PRIVACY POLICY</a></li>
                            <li>
                                <form action="{{ route('search') }}" method="GET" class="input-group input-group-sm mt-2">
                                    <input type="text" name="query" class="form-control" placeholder="Search...">
                                    <button class="btn btn-primary" type="submit">Go</button>
                                </form>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="text-center pt-4 border-top border-secondary mt-4">
            <p class="small mb-0 text-muted">&copy; {{ date('Y') }} La Verdad Herald. All Rights Reserved.</p>
        </div>
    </div>
</footer>