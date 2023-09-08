<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Storage;

class Edition extends Model
{
    use HasFactory;

    protected $fillable = [
        'book_id',
        'format',
        'description',
        'cover',
        'published_at',
    ];

    protected $hidden = [
        'cover',
        'created_at',
        'updated_at',
    ];

    protected $appends = [
        'cover_url',
    ];

    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class);
    }

    public function libraries(): BelongsToMany
    {
        return $this->belongsToMany(Library::class, 'library_edition_relations');
    }

    public function coverUrl(): Attribute
    {
        if ($this->cover == null) {
            $path = 'https://via.placeholder.com/150';
        } else {
            $path = asset($this->cover);
        }

        return new Attribute(
            get: fn() => $path,
        );
    }
}
