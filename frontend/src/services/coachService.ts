import type { Client, Coach } from "../types/User";
import api from "./api";

type CreateUpdatePayloadType = {
    name: string;
    email: string;
    password: string;
    phone?: string;
    cref?: string;
}

export const coachService = {
    index: async(): Promise<Coach[]> => {
        const { data } = await api.get('/coaches');
        return data;
    },
    get: async(id: number): Promise<Coach> => {
        const { data } = await api.get(`/coaches/${id}`);
        return data;
    },
    create: async(payload: CreateUpdatePayloadType): Promise<Coach> => {
        const { data } = await api.post('/coaches', payload);
        return data;
    },
    update: async(id: number, payload: CreateUpdatePayloadType): Promise<Coach> => {
        const { data } = await api.put(`/coaches/${id}`, payload);
        return data;
    },
    delete: async(id: number): Promise<void> => {
        await api.delete(`/coaches/${id}`);
    },
    clients: async(id: number): Promise<Client[]> => {
        const { data } = await api.get(`/coaches/${id}/clients`);
        return data;
    }
}