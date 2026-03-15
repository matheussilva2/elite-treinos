import { useEffect, useState } from "react";
import type { ClientWorkout, Exercise } from "../../types/Workout";
import { ui } from "../../styles/ui";
import { clientWorkoutService } from "../../services/clientWorkoutService";
import { useAuth } from "../../contexts/AuthContext";

const ExercisesList = ({exercises}: {exercises: Exercise[]}) => {
    return (
        <>
            {
                exercises.map((exercise) => (
                    <div className="pl-4">
                        <p>{exercise.order}. {exercise.name} — {exercise.sets}x{exercise.repeats}</p>
                    </div>
                ))
            }
        </>
    );
}

const WorkoutsList = ({workouts}: {workouts: ClientWorkout[]}) => {
    return (
        <div className="flex flex-col md:flex-row flex-wrap gap-2">
            {
                workouts.map((workout) => (
                    <div
                        key={workout.id}
                        className="block w-full md:w-fit border border-gray-600/50 p-2 rounded-md shadow-md"
                    >
                        <p className="text-xl font-bold">
                            {`Treino ${workout.workout_code} — ${workout.workout.name}`}
                        </p>
                        <p>
                            <span className="font-bold">
                                Objetivo:&nbsp;
                            </span>
                            {workout.workout.goal}
                        </p>
                        <p>
                            <span className="block font-bold mb-2">
                                Exercícios:
                            </span>
                            <ExercisesList exercises={workout.workout.exercises} />
                        </p>
                    </div>
                ))
            }
        </div>
    );
}

export const MyWorkouts = () => {
    const { user } = useAuth();
    const [workouts, setWorkouts] = useState<ClientWorkout[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchWorkouts = async() => {
        try {
            setLoading(true);
            const data = await clientWorkoutService.myWorkouts();
    
            setWorkouts(data);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchWorkouts();
    }, []);

    return (
        <div className="mb-3 p-4">
            <div className="flex gap-2 items-center mb-3">
                <h1 className={ui.title}>Olá, {user?.name}!</h1>
            </div>
            <div>
                <h2 className={`${ui.subtitle} mb-3`}>Seus treinos</h2>
                {
                    loading ? 'carregando...' : (
                        <WorkoutsList workouts={workouts} />
                    )
                }
            </div>
        </div>
    );
}