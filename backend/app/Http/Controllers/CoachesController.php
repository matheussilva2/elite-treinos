<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCoachRequest;
use App\Http\Requests\UpdateCoachRequest;
use App\Models\Coach;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CoachesController extends Controller
{
    public function index(): JsonResponse
    {
        $coaches = Coach::with('user')->get();

        return response()->json($coaches);
    }

    public function store(StoreCoachRequest $request): JsonResponse
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role' => 'coach',
        ]);

        $coach = Coach::create([
            'user_id' => $user->id,
            'phone' => $request->phone,
            'cref' => $request->cref
        ]);

        return response()->json($coach->load('user'), Response::HTTP_CREATED);
    }

    public function show(Coach $coach)
    {
        return response()->json($coach->load('user'));
    }

    public function update(UpdateCoachRequest $request, Coach $coach): JsonResponse
    {
        $coach->user->update(
            $request->only(['name', 'email', 'password'])
        );

        $coach->update(
            $request->only(['phone', 'cref'])
        );

        return response()->json($coach->load('user'));
    }

    public function destroy(Coach $coach): JsonResponse
    {
        $coach->user->delete();
        
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }

    public function clients(Coach $coach): JsonResponse {
        $clients = $coach->clients()->with('user')->get();

        return response()->json($clients);
    }
}
