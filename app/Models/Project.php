<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'slug', 'summary', 'description',
        'image_path', 'category', 'status', 'order',
    ];

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
