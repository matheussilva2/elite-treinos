<?php

namespace Database\Seeders;

use App\Models\Workout;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class WorkoutSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $workouts = [
            [
                'code' => 'A',
                'name' => 'Full Body (Base)',
                'goal' => 'Adaptação geral e base de força',
                'exercises' => [
                    ['order' => 3, 'name' => 'Remada curvada', 'sets' => 3, 'repeats' => '10', 'notes' => null],
                    ['order' => 4, 'name' => 'Desenvolvimento militar', 'sets' => 3, 'repeats' => '12', 'notes' => null],
                    ['order' => 2, 'name' => 'Supino reto', 'sets' => 3, 'repeats' => '10', 'notes' => null],
                    ['order' => 1, 'name' => 'Agachamento livre', 'sets' => 3, 'repeats' => '10', 'notes' => null],
                    ['order' => 5, 'name' => 'Prancha', 'sets' => 3, 'repeats' => '30-45s', 'notes' => null],
                ],
            ],
            [
                'code' => 'B',
                'name' => 'Inferiores (Pernas/Glúteos)',
                'goal' => 'Foco em pernas e glúteos',
                'exercises' => [
                    ['order' => 2, 'name' => 'Afundo (passada)', 'sets' => 3, 'repeats' => '10', 'notes' => 'Cada perna'],
                    ['order' => 4, 'name' => 'Cadeira extensora', 'sets' => 3, 'repeats' => '12', 'notes' => null],
                    ['order' => 1, 'name' => 'Leg press', 'sets' => 4, 'repeats' => '12', 'notes' => null],
                    ['order' => 3, 'name' => 'Mesa flexora', 'sets' => 3, 'repeats' => '12', 'notes' => null],
                    ['order' => 5, 'name' => 'Elevação pélvica', 'sets' => 4, 'repeats' => '10', 'notes' => null],
                ],
            ],
            [
                'code' => 'C',
                'name' => 'Superiores (Peito/Costas/Ombros)',
                'goal' => 'Hipertrofia de tronco',
                'exercises' => [
                    ['order' => 5, 'name' => 'Rosca direta', 'sets' => 3, 'repeats' => '12', 'notes' => null],
                    ['order' => 2, 'name' => 'Puxada na barra (pulldown)', 'sets' => 4, 'repeats' => '10', 'notes' => null],
                    ['order' => 3, 'name' => 'Remada baixa', 'sets' => 3, 'repeats' => '12', 'notes' => null],
                    ['order' => 4, 'name' => 'Elevação lateral', 'sets' => 3, 'repeats' => '15', 'notes' => null],
                    ['order' => 1, 'name' => 'Supino inclinado', 'sets' => 4, 'repeats' => '10', 'notes' => null],
                ],
            ],
            [
                'code' => 'D',
                'name' => 'Condicionamento + Core',
                'goal' => 'Condicionamento e core',
                'exercises' => [
                    ['order' => 2, 'name' => 'Burpee', 'sets' => 3, 'repeats' => '10', 'notes' => null],
                    ['order' => 4, 'name' => 'Prancha lateral', 'sets' => 3, 'repeats' => '30s', 'notes' => 'Cada lado'],
                    ['order' => 1, 'name' => 'HIIT na esteira/bike', 'sets' => 1, 'repeats' => '10-15min', 'notes' => '30s forte / 60s leve'],
                    ['order' => 3, 'name' => 'Abdominal infra', 'sets' => 3, 'repeats' => '15', 'notes' => null],
                    ['order' => 5, 'name' => 'Alongamento final', 'sets' => 1, 'repeats' => '5min', 'notes' => null],
                ],
            ],
        ];

        foreach($workouts as $workoutData) {
            $exercises = $workoutData['exercises'];
            unset($workoutData['exercises']);

            $workout = Workout::create($workoutData);

            foreach($exercises as $exercise) {
                $workout->exercises()->create($exercise);
            }
        }
    }
}
