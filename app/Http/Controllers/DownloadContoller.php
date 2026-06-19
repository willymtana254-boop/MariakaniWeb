<?php

namespace App\Http\Controllers;

use App\Models\DownloadDocument;
use Inertia\Inertia;
use Inertia\Response;

class DownloadController extends Controller
{
    public function index(): Response
    {
        $documents = DownloadDocument::orderByDesc('uploaded_at')->get();

        return Inertia::render('Downloads', [
            'documentsByCategory' => $documents->groupBy(fn ($doc) => $doc->category ?? 'General'),
        ]);
    }
}
