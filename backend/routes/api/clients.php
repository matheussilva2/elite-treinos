<?php

use App\Http\Controllers\ClientsController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum', 'role:coach'])->group(function() {
    Route::apiResource('clients', ClientsController::class);
});