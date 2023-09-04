<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'author_id',
        'publisher_id',
        'synopsis',
        'published_at',
    ];

    protected $casts = [
        'published_at' => 'date:Y',
    ];

    public function author(): BelongsTo
    {
        return $this->belongsTo(Author::class);
    }

    public function publisher(): BelongsTo
    {
        return $this->belongsTo(Publisher::class);
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class, 'book_tag_relations');
    }

    public function ratings(): HasMany
    {
        return $this->hasMany(Rating::class);
    }

    public function editions(): HasMany
    {
        return $this->hasMany(Edition::class);
    }
}
