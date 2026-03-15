export type Workout = {
    code: 'A' | 'B' | 'C' | 'D'; //hardcoded por ser treinos pré-registrados
    name: string;
    goal: string;
    exercises: Exercise[];
}

export type Exercise = {
    workout_code: string;
    order: number;
    name: string;
    sets: number;
    repeats: string;
    notes?: string;
}

export type ClientWorkout = {
    id: number;
    workout_code: string;
    client_id: number;
    workout: Workout;
}