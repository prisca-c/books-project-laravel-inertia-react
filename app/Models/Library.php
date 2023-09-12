<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Library extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'book_id',
        'notes',
        'edition_id',
        'started_at',
        'finished_at',
    ];

    protected $casts = [
        'started_at' => 'date:Y-m-d',
        'finished_at' => 'date:Y-m-d',
    ];

    protected $appends = [
        'status',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function edition(): BelongsTo
    {
        return $this->belongsTo(Edition::class)->withTrashed();
    }

    public function status(): Attribute
    {
        if ($this->started_at && $this->finished_at) {
            return new Attribute(
                get: fn() => 'Finished',
            );
        } elseif ($this->started_at) {
            return new Attribute(
                get: fn() => 'Currently Reading',
            );
        } else {
            return new Attribute(
                get: fn() => 'Not Started',
            );
        }
    }
}
