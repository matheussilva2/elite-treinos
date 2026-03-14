<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;
use App\Models\Client;
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

    public function show(Client $client): JsonResponse
    {
        return response()->json($client->load('user'));
    }

    public function update(UpdateClientRequest $request, Client $client): JsonResponse
    {
        if($this->isCoachAuthorized($request, $client)) {
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

    public function destroy(Client $client): JsonResponse
    {
        $client->user->delete();

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }

    private function isCoachAuthorized(Request $request, Client $client): bool {
        if($client->coach_id !== $request->user()->user_id) {
            return false;
        } else {
            return true;
        }
    }
}
