<?php

namespace App\Http\Controllers;

use App\Models\ContentBlock;
use App\Models\Ward;
use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('About', [
            'mission' => ContentBlock::get('mission'),
            'objectives' => ContentBlock::get('objectives'),
            'functions' => ContentBlock::get('functions'),
            'boundaries' => ContentBlock::get('boundaries'),
            'wards' => Ward::orderBy('order')->get(),
        ]);
    }
}
