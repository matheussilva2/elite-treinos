<?php

namespace App\Http\Controllers;

use App\Models\ClientWorkout;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function myWorkouts(Request $request): JsonResponse {
        $workouts = ClientWorkout::with('workout.exercises')
        ->where('client_id', $request->user()->id)->get();

        return response()->json($workouts);
    }
}
