<?php

use App\Http\Controllers\CoachesController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum', 'role:superadmin'])->group(function() {
    Route::apiResource('coaches', CoachesController::class);

    Route::get('coaches/{coach}/clients', [CoachesController::class, 'clients'])->name('coaches.clients');
});