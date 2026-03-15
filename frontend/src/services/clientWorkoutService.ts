import type { ClientWorkout } from "../types/Workout";
import api from "./api";

export const clientWorkoutService = {
    myWorkouts: async(): Promise<ClientWorkout[]> => {
        const { data } = await api.get(`/my-workouts`);
        return data;
    }
}