<?php

namespace App\Http\Controllers;

use App\Models\BoardMember;
use App\Models\ContentBlock;
use App\Models\NewsUpdate;
use App\Models\Project;
use App\Models\SiteStat;
use App\Models\Ward;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('home', [
            'objectives' => ContentBlock::get('objectives'),
            'functions' => ContentBlock::get('functions'),
            'boundaries' => ContentBlock::get('boundaries'),
            'governorMessage' => ContentBlock::get('governor_message'),
            'stats' => SiteStat::orderBy('order')->get(),
            'wards' => Ward::orderBy('order')->get(['id', 'name']),
            'featuredProjects' => Project::orderBy('order')->limit(3)->get(),
            'boardPreview' => BoardMember::orderBy('order')->limit(5)->get(),
            'latestNews' => NewsUpdate::whereNotNull('published_at')
                ->orderByDesc('published_at')
                ->limit(3)
                ->get(),
        ]);
    }
}
