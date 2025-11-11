<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Category;
use App\Models\Tag;
use App\Models\Log;
use App\Models\ArticleInteraction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ArticleController extends Controller
{
    public function index(Request $request)
    {
        $query = Article::with('author.user', 'categories', 'tags');

        // Filter by category if provided
        if ($request->has('category') && $request->category) {
            $query->whereHas('categories', function ($q) use ($request) {
                $q->where('name', $request->category);
            });
        }

        // Filter by limit if provided
        $limit = $request->get('limit', 10);
        if ($request->has('limit')) {
            $articles = $query->paginate($limit);
        } else {
            $articles = $query->paginate(10);
        }

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
            'excerpt' => 'required|string',
            'content' => 'required|string',
            'featured_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status' => 'required|in:draft,published,archived',
            'categories' => 'array',
            'tags' => 'array',
        ]);

        $data = $request->all();
        $data['slug'] = Str::slug($request->title);
        $data['author_id'] = Auth::user()->author->id;

        // If moderator, force status to draft
        if (Auth::user()->isModerator()) {
            $data['status'] = 'draft';
        }

        if ($request->hasFile('featured_image')) {
            $data['featured_image'] = $request->file('featured_image')->store('articles', 'public');
        }

        $article = Article::create($data);

        if ($request->categories) {
            $article->categories()->attach($request->categories);
        }

        if ($request->tags) {
            $article->tags()->attach($request->tags);
        }

        Log::create([
            'user_id' => Auth::id(),
            'action' => 'created',
            'model_type' => 'Article',
            'model_id' => $article->id,
            'new_values' => $article->toArray(),
        ]);

        if (request()->wantsJson()) {
            return response()->json($article->load('author.user', 'categories', 'tags'), 201);
        }
        return redirect()->route('articles.index')->with('success', 'Article created successfully.');
    }

    public function show(Article $article)
    {
        if (request()->wantsJson()) {
            return response()->json($article->load('author.user', 'categories', 'tags'));
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
            'excerpt' => 'required|string',
            'content' => 'required|string',
            'featured_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status' => 'required|in:draft,published,archived',
            'categories' => 'array',
            'tags' => 'array',
        ]);

        $oldValues = $article->toArray();

        $data = $request->all();
        $data['slug'] = Str::slug($request->title);

        if ($request->hasFile('featured_image')) {
            $data['featured_image'] = $request->file('featured_image')->store('articles', 'public');
        }

        $article->update($data);

        $article->categories()->sync($request->categories ?? []);
        $article->tags()->sync($request->tags ?? []);

        Log::create([
            'user_id' => Auth::id(),
            'action' => 'updated',
            'model_type' => 'Article',
            'model_id' => $article->id,
            'old_values' => $oldValues,
            'new_values' => $article->toArray(),
        ]);

        if (request()->wantsJson()) {
            return response()->json($article->load('author.user', 'categories', 'tags'));
        }
        return redirect()->route('articles.index')->with('success', 'Article updated successfully.');
    }

    public function destroy(Article $article)
    {
        $oldValues = $article->toArray();

        $article->delete();

        Log::create([
            'user_id' => Auth::id(),
            'action' => 'deleted',
            'model_type' => 'Article',
            'model_id' => $article->id,
            'old_values' => $oldValues,
        ]);

        if (request()->wantsJson()) {
            return response()->json(['message' => 'Article deleted successfully']);
        }
        return redirect()->route('articles.index')->with('success', 'Article deleted successfully.');
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
