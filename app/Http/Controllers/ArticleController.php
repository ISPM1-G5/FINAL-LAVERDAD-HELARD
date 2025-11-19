<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Category;
use App\Models\Tag;
use App\Models\Log;
use App\Models\ArticleInteraction;
use App\Models\Author;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ArticleController extends Controller
{
    public function index(Request $request)
    {
        $query = Article::with('author.user', 'categories', 'tags');
        
        // Filter by status if provided
        if ($request->has('status') && $request->status) {
            // Require authentication for draft articles
            if ($request->status === 'draft') {
                $user = Auth::user();
                if (!$user || !$user->isAdmin()) {
                    return response()->json(['error' => 'Admin access required for drafts'], 403);
                }
            }
            $query->where('status', $request->status);
        } else {
            $query->published();
        }
        
        $query->latest($request->status === 'draft' ? 'created_at' : 'published_at');

        // Filter by category if provided
        if ($request->has('category') && $request->category) {
            $query->whereHas('categories', function ($q) use ($request) {
                $q->where('name', 'LIKE', $request->category);
            });
        }

        // Filter by limit if provided
        $limit = $request->get('limit', 10);
        $articles = $query->paginate($limit);

        if (request()->wantsJson()) {
            return response()->json($articles);
        }
        return view('articles.index', compact('articles'));
    }

    public function publicIndex()
    {
        $articles = Article::published()->with('author.user', 'categories', 'tags')->paginate(10);
        return view('articles.index', compact('articles'));
    }

    public function create()
    {
        $categories = Category::all();
        $tags = Tag::all();
        return view('articles.create', compact('categories', 'tags'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string|min:1',
            'featured_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'category' => 'required|string',
            'tags' => 'required|string|min:1',
        ]);

        // Additional validation for trimmed values
        if (empty(trim($request->title))) {
            return response()->json(['error' => 'Title cannot be empty or contain only whitespace.'], 422);
        }
        if (empty(trim($request->input('content')))) {
            return response()->json(['error' => 'Content cannot be empty or contain only whitespace.'], 422);
        }
        if (empty(trim($request->tags))) {
            return response()->json(['error' => 'Tags cannot be empty or contain only whitespace.'], 422);
        }

        // Admin creates articles and assigns to authors
        $user = Auth::user();
        if (!$user || !$user->isAdmin()) {
            return response()->json(['error' => 'Admin access required'], 403);
        }
        
        // Use authenticated user as author
        $author = Author::where('user_id', $user->id)->first();
        if (!$author) {
            $author = Author::create([
                'name' => $user->name,
                'user_id' => $user->id,
            ]);
        }

        $baseSlug = Str::slug($request->title);
        $slug = $baseSlug;
        $counter = 1;
        
        while (Article::where('slug', $slug)->exists()) {
            $slug = $baseSlug . '-' . $counter;
            $counter++;
        }

        $status = $request->get('status', 'published');
        $articleData = [
            'title' => $request->title,
            'slug' => $slug,
            'content' => $request->input('content'),
            'author_id' => $author->id,
            'status' => $status,
            'published_at' => $status === 'published' ? now() : null,
            'excerpt' => Str::limit($request->input('content'), 150),
        ];

        if ($request->hasFile('featured_image')) {
            $articleData['featured_image'] = $request->file('featured_image')->store('articles', 'public');
        }

        $article = Article::create($articleData);

        if ($request->category) {
            $category = Category::firstOrCreate(['name' => $request->category]);
            $article->categories()->attach($category->id);
        }

        if ($request->tags) {
            $tags = explode(',', $request->tags);
            $tagIds = [];
            foreach ($tags as $tagName) {
                $tag = Tag::firstOrCreate(['name' => trim($tagName)]);
                $tagIds[] = $tag->id;
            }
            $article->tags()->attach($tagIds);
        }

        if (Auth::id()) {
            Log::create([
                'user_id' => Auth::id(),
                'action' => 'created',
                'model_type' => 'Article',
                'model_id' => $article->id,
                'new_values' => $article->toArray(),
            ]);
        }

        return response()->json($article->load('author.user', 'categories', 'tags'), 201)
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    }

    public function show(Article $article)
    {
        if (request()->wantsJson()) {
            return response()->json($article->load('author.user', 'categories', 'tags'))
                ->header('Access-Control-Allow-Origin', '*')
                ->header('Access-Control-Allow-Credentials', 'true')
                ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
                ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
        }
        return view('articles.show', compact('article'));
    }

    // Public-facing: show published article by slug
    public function publicShow(string $slug)
    {
        $article = Article::published()
            ->with('author.user', 'categories', 'tags')
            ->where('slug', $slug)
            ->firstOrFail();

        $related = \App\Models\Article::published()
            ->where('id', '!=', $article->id)
            ->whereHas('categories', function($q) use ($article){
                $q->whereIn('categories.id', $article->categories->pluck('id'));
            })
            ->with('author.user')
            ->latest('published_at')
            ->take(4)
            ->get();

        return view('articles.show', compact('article', 'related'));
    }

    public function edit(Article $article)
    {
        $categories = Category::all();
        $tags = Tag::all();
        return view('articles.edit', compact('article', 'categories', 'tags'));
    }

    public function update(Request $request, Article $article)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category' => 'required|string',
            'tags' => 'required|string',
            'featured_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $oldValues = $article->toArray();

        // Admin updates articles and assigns to authors
        $user = Auth::user();
        if (!$user || !$user->isAdmin()) {
            return response()->json(['error' => 'Admin access required'], 403);
        }
        
        // Use authenticated user as author
        $author = Author::where('user_id', $user->id)->first();
        if (!$author) {
            $author = Author::create([
                'name' => $user->name,
                'user_id' => $user->id,
            ]);
        }

        // Keep the original slug to maintain URL consistency
        $slug = $article->slug;

        // Update article data
        $data = [
            'title' => $request->title,
            'content' => $request->content,
            'author_id' => $author->id,
            'slug' => $slug,
            'excerpt' => Str::limit($request->content, 150),
        ];
        
        // Handle status update
        if ($request->has('status')) {
            $data['status'] = $request->status;
            if ($request->status === 'published' && !$article->published_at) {
                $data['published_at'] = now();
            }
        }

        if ($request->hasFile('featured_image')) {
            $data['featured_image'] = $request->file('featured_image')->store('articles', 'public');
        }

        $article->update($data);

        // Handle category
        if ($request->category) {
            $category = Category::firstOrCreate(['name' => $request->category]);
            $article->categories()->sync([$category->id]);
        }

        // Handle tags
        if ($request->tags) {
            $tags = explode(',', $request->tags);
            $tagIds = [];
            foreach ($tags as $tagName) {
                $tag = Tag::firstOrCreate(['name' => trim($tagName)]);
                $tagIds[] = $tag->id;
            }
            $article->tags()->sync($tagIds);
        }

        return response()->json($article->load('author.user', 'categories', 'tags'))
            ->header('Access-Control-Allow-Origin', 'http://localhost:5173')
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    }

    public function destroy(Article $article)
    {
        try {
            $oldValues = $article->toArray();

            $article->delete();

            return response()->json(['message' => 'Article deleted successfully'])
                ->header('Access-Control-Allow-Origin', '*')
                ->header('Access-Control-Allow-Credentials', 'true')
                ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
                ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete article: ' . $e->getMessage()], 500)
                ->header('Access-Control-Allow-Origin', '*')
                ->header('Access-Control-Allow-Credentials', 'true')
                ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
                ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
        }
    }

    public function like(Article $article)
    {
        $existing = ArticleInteraction::where('user_id', Auth::id())
            ->where('article_id', $article->id)
            ->where('type', 'liked')
            ->first();

        if ($existing) {
            $existing->delete();
            return back()->with('success', 'Article unliked.');
        }

        ArticleInteraction::create([
            'user_id' => Auth::id(),
            'article_id' => $article->id,
            'type' => 'liked',
        ]);

        return back()->with('success', 'Article liked!');
    }

    public function share(Article $article)
    {
        ArticleInteraction::updateOrCreate(
            [
                'user_id' => Auth::id(),
                'article_id' => $article->id,
                'type' => 'shared',
            ],
            []
        );

        return back()->with('success', 'Article shared!');
    }

    public function getLikedArticles(Request $request)
    {
        $perPage = $request->get('per_page', 10);
        $page = $request->get('page', 1);

        $articles = Article::whereHas('interactions', function ($query) {
            $query->where('user_id', Auth::id())
                  ->where('type', 'liked');
        })
        ->with('author.user', 'categories', 'tags')
        ->paginate($perPage, ['*'], 'page', $page);

        return response()->json($articles)
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    }

    public function getSharedArticles(Request $request)
    {
        $perPage = $request->get('per_page', 10);
        $page = $request->get('page', 1);

        $articles = Article::whereHas('interactions', function ($query) {
            $query->where('user_id', Auth::id())
                  ->where('type', 'shared');
        })
        ->with('author.user', 'categories', 'tags')
        ->paginate($perPage, ['*'], 'page', $page);

        return response()->json($articles)
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    }
}
