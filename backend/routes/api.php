<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\ClientController;
use Illuminate\Support\Facades\Route;

Route::post('/auth/login', [AuthController::class, 'login'])->name('auth.login');

Route::middleware('auth:sanctum')->group(function() {
    Route::post('/auth/logout', [AuthController::class, 'logout'])->name('auth.logout');
    Route::get('/auth/me', [AuthController::class, 'me'])->name('auth.me');
    Route::get('/my-workouts', [ClientController::class, 'myWorkouts'])->middleware('role:client')->name('workouts.my');
});

require __DIR__ . '/api/coaches.php';
require __DIR__ . '/api/clients.php';