<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\Coach;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin',
            'email' => 'admin@admin.com',
            'password' => bcrypt('admin'),
            'role' => 'superadmin'
        ]);

        $coachUser = User::create([
            'name' => 'Personal',
            'email' => 'personal@teste.com',
            'password' => bcrypt('personal'),
            'role' => 'coach'
        ]);

        $coach = Coach::create([
            'user_id' => $coachUser->id,
            'phone' => '9999999999',
            'cref' => '000000-X/AL'
        ]);

        $clientUser = User::create([
            'name' => 'Aluno',
            'email' => 'client@teste.com',
            'password' => bcrypt('client'),
            'role' => 'client'
        ]);

        Client::create([
            'user_id' => $clientUser->id,
            'coach_id' => $coach->user_id,
            'birthdate' => '1998-10-28',
            'notes' => 'Lorem ipsum dolor'
        ]);
    }
}
