<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Client extends Model
{
    protected $fillable = ['user_id', 'coach_id', 'birthdate', 'notes'];

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function coach(): BelongsTo {
        return $this->belongsTo(Coach::class);
    }

    public function clientWorkouts(): HasMany {
        return $this->hasMany(ClientWorkout::class);
    }
}
