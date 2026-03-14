<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Coach extends Model
{
    protected $fillable = ['phone', 'cref','user_id'];
    protected $table = 'coaches';
    protected $primaryKey = 'user_id';
    public $incrementing = false;
    
    public function user(): BelongsTo {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function clients(): HasMany {
        return $this->hasMany(Client::class, 'coach_id', 'user_id');
    }
}
