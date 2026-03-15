<?php

namespace App\Http\Controllers;

use App\Http\Requests\AssignWorkoutRequest;
use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;
use App\Models\Client;
use App\Models\ClientWorkout;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ClientsController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $clients = Client::with('user')
        ->where('coach_id', $request->user()->coach->user_id)
        ->get();

        return response()->json($clients);
    }

    public function store(StoreClientRequest $request): JsonResponse
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role' => 'client' 
        ]);

        $client = Client::create([
            'user_id' => $user->id,
            'coach_id' => $request->user()->id,
            'birthdate' => $request->birthdate,
            'notes' => $request->notes
        ]);

        return response()->json($client->load('user'), Response::HTTP_CREATED);
    }

    public function show(Request $request, Client $client): JsonResponse
    {
        if(!$this->isCoachAuthorized($request, $client)) {
            return response()->json([
                "error" => "Não autorizado."
            ], Response::HTTP_FORBIDDEN);
        }

        return response()->json($client->load('user'));
    }

    public function update(UpdateClientRequest $request, Client $client): JsonResponse
    {
        if(!$this->isCoachAuthorized($request, $client)) {
            return response()->json([
                "error" => "Não autorizado."
            ], Response::HTTP_FORBIDDEN);
        }

        $client->user->update(
            $request->only(['name', 'email', 'password'])
        );

        $client->update(
            $request->only(['birthdate', 'notes'])
        );

        return response()->json($client->load('user'));
    }

    public function destroy(Request $request, Client $client): JsonResponse
    {
        if(!$this->isCoachAuthorized($request, $client)) {
            return response()->json([
                "error" => "Não autorizado."
            ], Response::HTTP_FORBIDDEN);
        }

        $client->user->delete();

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }

    public function assignWorkout(AssignWorkoutRequest $request, Client $client): JsonResponse {
        if(!$this->isCoachAuthorized($request, $client)) {
            return response()->json([
                "error" => "Não autorizado."
            ], Response::HTTP_FORBIDDEN);
        }

        $workout_counts = ClientWorkout::where('client_id', $client->user_id)->count();

        if($workout_counts >= 2) {
            return response()->json(
                ['message' => 'Limite de treinos alcançado (max: 2).'],
                Response::HTTP_UNPROCESSABLE_ENTITY
            );
        }

        $isAlredyAssigned = ClientWorkout::where('client_id', $client->user_id)
        ->where('workout_code', $request->workout_code)
        ->exists();

        if($isAlredyAssigned) {
            return response()->json([
                'message' => 'Esse treino já está cadastrado.'
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $clientWorkout = ClientWorkout::create([
            'client_id' => $client->user_id,
            'workout_code' => $request->workout_code
        ]);

        return response()->json($clientWorkout->load('workout'), Response::HTTP_CREATED);
    }

    public function workouts(Request $request, Client $client): JsonResponse {
        if(!$this->isCoachAuthorized($request, $client)) {
            return response()->json([
                "error" => "Não autorizado."
            ], Response::HTTP_FORBIDDEN);   
        }

        $workouts = ClientWorkout::where('client_id', $client->user_id)->get();

        return response()->json($workouts->load('workout'));
    }

    private function isCoachAuthorized(Request $request, Client $client): bool {
        if($client->coach_id === $request->user()->user_id) {
            return false;
        } else {
            return true;
        }
    }
}
