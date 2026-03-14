import { useState } from "react";
import { ui } from "../../styles/ui";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const submitLogin = async(e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        
        try {
            const user = await login(email, password);

            switch (user.role) {
                case 'superadmin':
                    navigate('/admin');
                    break;
                case 'coach':
                    navigate('/coach');
                    break;
                case 'client':
                    navigate('/my-workouts');
                    break;
            }
        } catch(err) {
            setError('Email e/ou senha inválidos.');
        } finally {
            setLoading(false);
        }
    }

    return <div className="w-screen h-screen flex items-center justify-center">
        <form onSubmit={submitLogin} className="flex flex-col gap-2 w-[400px] max-w-screen px-6 p-2 rounded-md">
            <h1 className={`${ui.title} text-center`}>Elite Treinos</h1>
            <h2 className={`${ui.subtitle} text-center`}>Login</h2>

            <input
                className={`${ui.input}`}
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />

            <input
                className={`${ui.input}`}
                type="password"
                placeholder="Senha"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />

            {error && <span className={`${ui.feedbackError}`}>{error}</span>}

            <button type="submit" className={`${ui.btnPrimary}`}>Entrar</button>
        </form>
    </div>;
}