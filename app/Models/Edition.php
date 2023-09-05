<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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

    protected $casts = [
        'published_at' => 'date:Y',
    ];

public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class);
    }
}
