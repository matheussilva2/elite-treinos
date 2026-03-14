<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Coach extends Model
{
    protected $fillable = ['phone', 'cref','user_id'];
    protected $table = 'coaches';
    protected $primaryKey = 'user_id';
    
    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }
}
