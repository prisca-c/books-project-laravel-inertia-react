<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BookTagRelation extends Model
{
    use HasFactory;

    protected $fillable = [
        'book_id',
        'tag_id',
    ];

    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class);
    }

    public function tag(): BelongsTo
    {
        return $this->belongsTo(Tag::class);
    }
}
