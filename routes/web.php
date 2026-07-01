<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\BoardMemberController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DownloadController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MunicipalStructureController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/welcome', function () {
    return Inertia::render('welcome');
})->name('welcome');

Route::get('/about', [AboutController::class, 'index'])->name('about');
Route::get('/municipal-structure', [MunicipalStructureController::class, 'index'])->name('municipal-structure');
Route::get('/downloads', [DownloadController::class, 'index'])->name('downloads');

Route::get('/contact', [ContactController::class, 'index'])->name('contact');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

// Public reads
Route::get('projects', [ProjectController::class, 'index'])->name('projects.index');
Route::get('projects/{project}', [ProjectController::class, 'show'])->name('projects.show');

Route::get('news', [NewsController::class, 'index'])->name('news.index');
Route::get('news/{news}', [NewsController::class, 'show'])->name('news.show');

// Board Members stays fully open
Route::resource('board-members', BoardMemberController::class);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Admin: Projects
    Route::get('projects-manage', [ProjectController::class, 'manage'])->name('projects.manage');
    Route::resource('projects', ProjectController::class)
        ->except(['index', 'show'])
        ->names('projects');

    // Admin: News
    Route::get('news-manage', [NewsController::class, 'manage'])->name('news.manage');
    Route::resource('news', NewsController::class)
        ->except(['index', 'show'])
        ->names('news');
});

require __DIR__.'/settings.php';