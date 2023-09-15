<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Rating extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'book_id',
        'rating',
        'review',
        'user_id',
    ];

    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function scopeWithUsername(Builder $query)
    {
        // Select ratings.*, (select username from users where users.id =  user_id) as username from ratings
        return $query->addSelect(['username' =>
            User::select('username')->whereColumn('users.id', 'user_id')]
        );
    }
}
