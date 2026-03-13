<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Exercise extends Model
{
    protected $fillable = ['workout_code', 'order', 'name', 'sets', 'repeats', 'notes'];

    public function workout(): BelongsTo {
        return $this->belongsTo(Workout::class, 'workout_code', 'code');
    }
}
