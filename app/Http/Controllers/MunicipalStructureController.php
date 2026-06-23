<?php

namespace App\Http\Controllers;

use App\Models\BoardMember;
use App\Models\Ward;
use Inertia\Inertia;
use Inertia\Response;

class MunicipalStructureController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('municipalStructure', [
            'boardMembers' => BoardMember::orderBy('order')->get(),
            'wards' => Ward::orderBy('order')->get(),
        ]);
    }
}
