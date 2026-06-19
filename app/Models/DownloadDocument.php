<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DownloadDocument extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'category', 'file_path', 'file_size', 'uploaded_at',
    ];

    protected $casts = [
        'uploaded_at' => 'datetime',
    ];
}
