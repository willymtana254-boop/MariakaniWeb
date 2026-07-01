<?php

use Inertia\Inertia;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\BoardMemberController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DownloadController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MunicipalStructureController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/welcome', function(){
    Inertia::render('welcome');
} );

Route::resource('board-members', BoardMemberController::class);

Route::get('/about', [AboutController::class, 'index'])->name('about');
Route::get('/municipal-structure', [MunicipalStructureController::class, 'index'])->name('municipal-structure');

Route::get('/projects', [ProjectController::class, 'index'])->name('projects.index');
Route::get('/projects/{project}', [ProjectController::class, 'show'])->name('projects.show');

Route::get('/downloads', [DownloadController::class, 'index'])->name('downloads');

// Public
Route::get('news', [NewsController::class, 'index'])->name('news.index');
Route::get('news/{news}', [NewsController::class, 'show'])->name('news.show');

// Admin
Route::middleware(['auth'])->group(function () {
    Route::get('news-manage/create', [NewsController::class, 'create'])->name('news.create');
    Route::post('news-manage', [NewsController::class, 'store'])->name('news.store');
    Route::get('news-manage/{news}/edit', [NewsController::class, 'edit'])->name('news.edit');
    Route::put('news-manage/{news}', [NewsController::class, 'update'])->name('news.update');
    Route::delete('news-manage/{news}', [NewsController::class, 'destroy'])->name('news.destroy');
});

Route::get('/contact', [ContactController::class, 'index'])->name('contact');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';