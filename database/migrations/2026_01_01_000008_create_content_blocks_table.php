<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('content_blocks', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique(); // e.g. "governor_message", "objectives", "functions"
            $table->string('title')->nullable();
            $table->longText('body')->nullable();
            $table->string('image_path')->nullable();
            $table->string('byline')->nullable(); // e.g. "H.E. Gideon M. Mung'aro, OGW"
            $table->string('byline_role')->nullable(); // e.g. "Governor, Kilifi County"
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('content_blocks');
    }
};
