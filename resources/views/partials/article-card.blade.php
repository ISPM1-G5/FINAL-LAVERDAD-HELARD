{{-- Assumes $article variable is passed from the parent view --}}
<div class="article-card shadow-sm border rounded p-3 h-100 bg-light">
    {{-- Placeholder for the image/blue box --}}
    <div class="card-image-placeholder bg-primary mb-3" style="height: 120px;"></div> 
    
    <h5 class="card-title fw-bold fs-6">
        <a href="{{ route('article.show', $article->slug ?? 'shoreditch-best-badges') }}" class="text-decoration-none text-dark">
            {{ $article->title ?? 'Shoreditch’s best badges' }}
        </a>
    </h5>
    <p class="card-text text-muted small">
        <a href="{{ route('article.show', $article->slug ?? 'shoreditch-best-badges') }}" class="text-decoration-none text-primary">Read more</a>
    </p>
</div>