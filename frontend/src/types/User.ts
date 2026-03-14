export interface User {
    id: number;
    name: string;
    email: string;
    role: 'superadmin' | 'coach' | 'client'
};

export interface Coach {
    user: User;
    phone?: string;
    cref?: string;
}

export interface Client {
    coach_id: number;
    user: User;
    birthdate?: Date;
    notes?: string;
}