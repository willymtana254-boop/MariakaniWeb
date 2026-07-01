<?php

namespace App\Http\Controllers;

use App\Models\BoardMember;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class BoardMemberController extends Controller
{
    /**
     * Display a listing of board members, ordered by the 'order' column.
     */
    public function index(): Response
    {
        return Inertia::render('board-members/index', [
            'boardMembers' => BoardMember::orderBy('order')->get(),
        ]);
    }

    /**
     * Show the form for creating a new board member.
     */
    public function create(): Response
    {
        return Inertia::render('board-members/create');
    }

    /**
     * Store a newly created board member in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'  => ['required', 'string', 'max:255'],
            'role'  => ['required', 'string', 'max:255'],
            'bio'   => ['nullable', 'string'],
            'photo' => ['nullable', 'image', 'max:2048'], // 2MB max
            'order' => ['nullable', 'integer'],
        ]);

        if ($request->hasFile('photo')) {
            $validated['photo_path'] = $request->file('photo')->store('board-members', 'public');
        }

        unset($validated['photo']);

        BoardMember::create($validated);

        return redirect()
            ->route('board-members.index')
            ->with('success', 'Board member created successfully.');
    }

    /**
     * Display the specified board member.
     */
    public function show(BoardMember $boardMember): Response
    {
        return Inertia::render('board-members/show', [
            'boardMember' => $boardMember,
        ]);
    }

    /**
     * Show the form for editing the specified board member.
     */
    public function edit(BoardMember $boardMember): Response
    {
        return Inertia::render('board-members/edit', [
            'boardMember' => $boardMember,
        ]);
    }

    /**
     * Update the specified board member in storage.
     */
    public function update(Request $request, BoardMember $boardMember)
    {
        $validated = $request->validate([
            'name'  => ['required', 'string', 'max:255'],
            'role'  => ['required', 'string', 'max:255'],
            'bio'   => ['nullable', 'string'],
            'photo' => ['nullable', 'image', 'max:2048'],
            'order' => ['nullable', 'integer'],
        ]);

        if ($request->hasFile('photo')) {
            if ($boardMember->photo_path) {
                Storage::disk('public')->delete($boardMember->photo_path);
            }

            $validated['photo_path'] = $request->file('photo')->store('board-members', 'public');
        }

        unset($validated['photo']);

        $boardMember->update($validated);

        return redirect()
            ->route('board-members.index')
            ->with('success', 'Board member updated successfully.');
    }

    /**
     * Remove the specified board member from storage.
     */
    public function destroy(BoardMember $boardMember)
    {
        if ($boardMember->photo_path) {
            Storage::disk('public')->delete($boardMember->photo_path);
        }

        $boardMember->delete();

        return redirect()
            ->route('board-members.index')
            ->with('success', 'Board member deleted successfully.');
    }
}