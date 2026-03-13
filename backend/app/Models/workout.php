<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Workout extends Model
{
    protected $fillable = ['name', 'goal'];
    protected $primaryKey = 'code';
    protected $keyType = 'string';
    public $incrementing = false;

    public function exercises(): HasMany {
        return $this->hasMany(Exercise::class, 'workout_code', 'code');
    }
}
