<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Projects/Index', [
            'projects' => Project::orderBy('order')->get(),
        ]);
    }

    public function show(Project $project): Response
    {
        return Inertia::render('Projects/Show', [
            'project' => $project,
            'otherProjects' => Project::where('id', '!=', $project->id)
                ->orderBy('order')
                ->limit(3)
                ->get(),
        ]);
    }
}