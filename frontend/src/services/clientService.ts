import type { Client } from "../types/User";
import type { ClientWorkout } from "../types/Workout";
import api from "./api";

type CreatePayloadType = {
    name: string;
    email: string;
    password: string;
    birthdate?: string;
    notes?: string;
}

type UpdatePayloadType = {
    name?: string;
    email?: string;
    password?: string;
    birthdate?: string;
    notes?: string;
}

export const clientService = {
    index: async(): Promise<Client[]> => {
        const { data } = await api.get('/clients');
        return data;
    },
    get: async(id: number): Promise<Client> => {
        const { data } = await api.get(`/clients/${id}`);
        return data;
    },
    create: async(payload: CreatePayloadType): Promise<Client> => {
        const { data } = await api.post('/clients', payload);
        return data;
    },
    update: async(id: number, payload: UpdatePayloadType): Promise<Client> => {
        const { data } = await api.put(`/clients/${id}`, payload);
        return data;
    },
    delete: async(id: number): Promise<void> => {
        await api.delete(`/clients/${id}`);
    },
    workouts: async(id: number): Promise<ClientWorkout[]> => {
        const { data } = await api.get(`/clients/${id}/workouts`);
        return data;
    },
    assignWorkout: async(id: number, workout_code: 'A'|'B'|'C'|'D'): Promise<ClientWorkout> => {
        const { data } = await api.post(`/clients/${id}/workouts`, { workout_code });
        return data;
    } 
}