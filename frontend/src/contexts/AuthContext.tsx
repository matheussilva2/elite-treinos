import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "../types/User";
import api from "../services/api";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<User>;
    logout: () =>  Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({children} : { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if(token) {
            api.get('/auth/me')
                .then(({ data }) => setUser(data))
                .catch(() => {
                    localStorage.removeItem('token');
                    setUser(null);
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }

    }, []);

    async function login(email: string, password: string): Promise<User> {
        const { data } = await api.post('/auth/login', { email, password });

        localStorage.setItem('token', data.token);

        setUser(data.user);

        return data.user;
    }

    async function logout(): Promise<void> {
        await api.post('auth/logout');

        localStorage.removeItem('token');

        setUser(null);
    }

    return <AuthContext.Provider value={{ user, loading, login, logout }}>
        {children}
    </AuthContext.Provider>
}

export function useAuth() {
    return useContext(AuthContext);
}