<?php

namespace App\Http\Controllers;

use App\Models\NewsUpdate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class NewsController extends Controller
{
    /**
     * Public-facing: list published news.
     */
    public function index(): Response
    {
        return Inertia::render('news/Index', [
            'news' => NewsUpdate::whereNotNull('published_at')
                ->orderByDesc('published_at')
                ->paginate(9)
                ->withQueryString(),
        ]);
    }

    /**
     * Public-facing: show a single published article.
     */
    public function show(NewsUpdate $news): Response
    {
        return Inertia::render('news/Show', [
            'article' => $news,
            'otherNews' => NewsUpdate::where('id', '!=', $news->id)
                ->whereNotNull('published_at')
                ->orderByDesc('published_at')
                ->limit(3)
                ->get(),
        ]);
    }

    /**
     * Admin: list all news (published and drafts) for management.
     */
    public function manage(): Response
    {
        return Inertia::render('news/manage', [
            'news' => NewsUpdate::orderByDesc('created_at')->paginate(15)->withQueryString(),
        ]);
    }

    /**
     * Admin: show the form for creating a new article.
     */
    public function create(): Response
    {
        return Inertia::render('news/create');
    }

    /**
     * Admin: store a newly created article.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'        => ['required', 'string', 'max:255'],
            'excerpt'      => ['nullable', 'string', 'max:500'],
            'content'      => ['required', 'string'],
            'image'        => ['nullable', 'image', 'max:2048'],
            'published_at' => ['nullable', 'date'],
        ]);

        $validated['slug'] = $this->uniqueSlug($validated['title']);

        if ($request->hasFile('image')) {
            $validated['image_path'] = $request->file('image')->store('news', 'public');
        }

        unset($validated['image']);

        NewsUpdate::create($validated);

        return redirect()
            ->route('news.manage')
            ->with('success', 'Article created successfully.');
    }

    /**
     * Admin: show the form for editing an article.
     */
    public function edit(NewsUpdate $news): Response
    {
        return Inertia::render('news/edit', [
            'article' => $news,
        ]);
    }

    /**
     * Admin: update an existing article.
     */
    public function update(Request $request, NewsUpdate $news)
    {
        $validated = $request->validate([
            'title'        => ['required', 'string', 'max:255'],
            'excerpt'      => ['nullable', 'string', 'max:500'],
            'content'      => ['required', 'string'],
            'image'        => ['nullable', 'image', 'max:2048'],
            'published_at' => ['nullable', 'date'],
        ]);

        if ($validated['title'] !== $news->title) {
            $validated['slug'] = $this->uniqueSlug($validated['title'], $news->id);
        }

        if ($request->hasFile('image')) {
            if ($news->image_path) {
                Storage::disk('public')->delete($news->image_path);
            }

            $validated['image_path'] = $request->file('image')->store('news', 'public');
        }

        unset($validated['image']);

        $news->update($validated);

        return redirect()
            ->route('news.manage')
            ->with('success', 'Article updated successfully.');
    }

    /**
     * Admin: delete an article.
     */
    public function destroy(NewsUpdate $news)
    {
        if ($news->image_path) {
            Storage::disk('public')->delete($news->image_path);
        }

        $news->delete();

        return redirect()
            ->route('news.manage')
            ->with('success', 'Article deleted successfully.');
    }

    /**
     * Generate a unique slug from the title, excluding the given ID if updating.
     */
    protected function uniqueSlug(string $title, ?int $ignoreId = null): string
    {
        $slug = Str::slug($title);
        $original = $slug;
        $count = 1;

        while (
            NewsUpdate::where('slug', $slug)
                ->when($ignoreId, fn ($query) => $query->where('id', '!=', $ignoreId))
                ->exists()
        ) {
            $slug = "{$original}-{$count}";
            $count++;
        }

        return $slug;
    }
}