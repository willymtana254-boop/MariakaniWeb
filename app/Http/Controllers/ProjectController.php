<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    /**
     * Public-facing: list all projects.
     */
    public function index(): Response
    {
        return Inertia::render('projects/Index', [
            'projects' => Project::orderBy('order')->get(),
        ]);
    }

    /**
     * Public-facing: show a single project.
     */
    public function show(Project $project): Response
    {
        return Inertia::render('projects/Show', [
            'project' => $project,
            'otherProjects' => Project::where('id', '!=', $project->id)
                ->orderBy('order')
                ->limit(3)
                ->get(),
        ]);
    }

    /**
     * Admin: list all projects for management.
     */
    public function manage(): Response
    {
        return Inertia::render('projects/manage', [
            'projects' => Project::orderBy('order')->get(),
        ]);
    }

    /**
     * Admin: show the form for creating a new project.
     */
    public function create(): Response
    {
        return Inertia::render('projects/create');
    }

    /**
     * Admin: store a newly created project.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'       => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:500'],
            'content'     => ['nullable', 'string'],
            'status'      => ['nullable', 'string', 'max:100'],
            'image'       => ['nullable', 'image', 'max:2048'],
            'order'       => ['nullable', 'integer'],
        ]);

        $validated['slug'] = $this->uniqueSlug($validated['title']);

        if ($request->hasFile('image')) {
            $validated['image_path'] = $request->file('image')->store('projects', 'public');
        }

        unset($validated['image']);

        Project::create($validated);

        return redirect()
            ->route('projects.manage')
            ->with('success', 'Project created successfully.');
    }

    /**
     * Admin: show the form for editing a project.
     */
    public function edit(Project $project): Response
    {
        return Inertia::render('projects/edit', [
            'project' => $project,
        ]);
    }

    /**
     * Admin: update an existing project.
     */
    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title'       => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:500'],
            'content'     => ['nullable', 'string'],
            'status'      => ['nullable', 'string', 'max:100'],
            'image'       => ['nullable', 'image', 'max:2048'],
            'order'       => ['nullable', 'integer'],
        ]);

        if ($validated['title'] !== $project->title) {
            $validated['slug'] = $this->uniqueSlug($validated['title'], $project->id);
        }

        if ($request->hasFile('image')) {
            if ($project->image_path) {
                Storage::disk('public')->delete($project->image_path);
            }

            $validated['image_path'] = $request->file('image')->store('projects', 'public');
        }

        unset($validated['image']);

        $project->update($validated);

        return redirect()
            ->route('projects.manage')
            ->with('success', 'Project updated successfully.');
    }

    /**
     * Admin: delete a project.
     */
    public function destroy(Project $project)
    {
        if ($project->image_path) {
            Storage::disk('public')->delete($project->image_path);
        }

        $project->delete();

        return redirect()
            ->route('projects.manage')
            ->with('success', 'Project deleted successfully.');
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
            Project::where('slug', $slug)
                ->when($ignoreId, fn ($query) => $query->where('id', '!=', $ignoreId))
                ->exists()
        ) {
            $slug = "{$original}-{$count}";
            $count++;
        }

        return $slug;
    }
}