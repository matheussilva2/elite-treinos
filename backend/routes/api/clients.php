<?php

use App\Http\Controllers\ClientsController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum', 'role:coach'])->group(function() {
    Route::apiResource('clients', ClientsController::class);

    Route::post('clients/{client}/workouts', [ClientsController::class, 'assignWorkout'])->name('clients.workouts.create');
    Route::get('clients/{client}/workouts', [ClientsController::class, 'workouts'])->name('clients.workouts.index');
});