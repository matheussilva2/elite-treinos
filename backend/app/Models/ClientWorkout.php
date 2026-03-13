<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ClientWorkout extends Model
{
    protected $fillable = ['workout_code', 'client_id'];

    public function client(): BelongsTo {
        return $this->belongsTo(Client::class);
    }

    public function workout(): BelongsTo {
        return $this->belongsTO(Workout::class, 'workout_code', 'code');
    }
}
