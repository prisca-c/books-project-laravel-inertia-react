<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Book extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'id',
        'title',
        'author_id',
        'publisher_id',
        'synopsis',
        'published_at',
    ];

    protected $appends = [
        'cover',
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

    public function cover(): Attribute
    {
        if ($this->editions->count() > 0) {
            $path = $this->editions->first()->cover_url;
        } else {
            $path = 'https://via.placeholder.com/150';
        }

        return new Attribute(
            get: fn () => $path,
        );
    }
}
