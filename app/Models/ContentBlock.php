<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContentBlock extends Model
{
    use HasFactory;

    protected $fillable = [
        'key', 'title', 'body', 'image_path', 'byline', 'byline_role',
    ];

    /**
     * Convenience accessor: ContentBlock::get('governor_message')
     */
    public static function get(string $key): ?self
    {
        return static::where('key', $key)->first();
    }
}
