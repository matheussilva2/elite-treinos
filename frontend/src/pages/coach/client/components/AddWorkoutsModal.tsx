import { useEffect, useState } from "react"
import type { Exercise, Workout } from "../../../../types/Workout"
import api from "../../../../services/api";
import { ui } from "../../../../styles/ui";
import type { Client } from "../../../../types/User";
import { clientService } from "../../../../services/clientService";

type WorkoutExercisesType = Workout & {
    exercises: Exercise[]
}

type AddWorkoutsModalProps = {
    isOpen: boolean;
    client: Client;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    callback?: () => any;
}

export const WorkoutExercises = ({workout}: {workout: WorkoutExercisesType}) => {
    return(
    <div className="h-50 overflow-y-scroll mb-2 rounded-md p-2 border border-gray-600/20">
        {
            workout.exercises.map((exercise) => (
                <div className="border border-gray-600/50 rounded-md mb-2 p-2">
                    <p>{exercise.name} - {exercise.sets > 0 && exercise.sets}x{exercise.repeats}</p>
                    <p>Ordem: {exercise.order}</p>
                    <p>Obs.: {exercise.notes}</p>
                </div>
            ))
        }
    </div>
)
}

export const AddWorkoutsModal = ({ isOpen, client, setOpen, callback }: AddWorkoutsModalProps) => {

    const [workouts, setWorkouts] = useState<WorkoutExercisesType[]>([]);
    const [selectedWorkout, setSelectedWorkout] = useState<WorkoutExercisesType | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);

    const assignWorkout = async() => {
        if(!selectedWorkout) return;

        setSaving(true);
        setError('');

        try {
            await clientService.assignWorkout(client.user.id, selectedWorkout.code);
            if(callback) callback();
            setOpen(false);
        } catch(error: any) {
            handleApiError(error.response.data);
        } finally {
            setSaving(false);
        }
    }

    const fetchWorkouts = async() => {
        setLoading(true);
        const { data } = await api.get('/workouts');
        setWorkouts(data);
        setLoading(false);
    }

    const handleApiError = (data: any): void => {
        const error: any = Object.values(data);
        
        setError(error);
    }

    const selectWorkout = async(e: React.ChangeEvent<HTMLSelectElement>) => {
        const workout_code = e.target.selectedOptions[0].value as 'A' | 'B' | 'C' | 'D' | 'none';
        if(workout_code === 'none') {
            setSelectedWorkout(null);
            return;
        }

        const selected = workouts.find(w => w.code === workout_code) ?? null;
        setSelectedWorkout(selected);
    }

    useEffect(() => {
        fetchWorkouts();
    }, [isOpen]);
    
    return (
        <div className="flex items-center justify-center w-screen h-screen fixed top-0 left-0 bg-gray-950/10">
            <div className="w-100 max-w-full bg-white rounded-md p-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className={ui.title}>Adicionar treino</h1>
                    <button onClick={() => setOpen(false)} className="text-2xl cursor-pointer">&times;</button>
                </div>
                <div className="my-4">
                    <p>
                        Nome: <span className="font-bold">{client.user.name}</span>
                    </p>
                </div>

                <select onChange={selectWorkout} className={`${ui.input} mb-3`} defaultValue={'none'}>
                    <option value="none">Selecione um treino</option>
                    {
                        loading ? <option value="none" selected>carregando...</option>: (
                            workouts.map((workout) => (
                                <option key={workout.code} value={workout.code}>
                                    {`Treino ${workout.code} - ${workout.name}`}
                                </option>
                            ))
                        )
                    }
                </select>
                
                {
                    selectedWorkout && (
                        <WorkoutExercises workout={selectedWorkout} />
                    )
                }

                {
                    error && (
                        <span className={ui.feedbackError}>{error}</span>
                    )
                }

                <div className="flex justify-end">
                    <button disabled={saving} onClick={assignWorkout} className={ui.btnPrimary}>
                        {saving ? 'salvando...' : 'Salvar'}
                    </button>
                </div>
            </div>
        </div>
    );
}