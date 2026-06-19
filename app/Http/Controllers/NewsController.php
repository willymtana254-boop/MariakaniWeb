<?php

namespace App\Http\Controllers;

use App\Models\NewsUpdate;
use Inertia\Inertia;
use Inertia\Response;

class NewsController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('News/Index', [
            'news' => NewsUpdate::whereNotNull('published_at')
                ->orderByDesc('published_at')
                ->paginate(9)
                ->withQueryString(),
        ]);
    }

    public function show(NewsUpdate $news): Response
    {
        return Inertia::render('News/Show', [
            'article' => $news,
            'otherNews' => NewsUpdate::where('id', '!=', $news->id)
                ->whereNotNull('published_at')
                ->orderByDesc('published_at')
                ->limit(3)
                ->get(),
        ]);
    }
}
