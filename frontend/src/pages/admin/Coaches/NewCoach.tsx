import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { coachService } from "../../../services/coachService";
import { ui } from "../../../styles/ui";

interface CoachForm {
    name: string;
    email: string;
    password: string;
    phone: string;
    cref: string;
}

const clearedForm: CoachForm = {
    name: '',
    email: '',
    password: '',
    phone: '',
    cref: ''
};

export const NewCoach = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState<CoachForm>(clearedForm);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }

    const handleApiError = (data: any): void => {
        const firstError: any = Object.values(data.errors)[0];
        
        setError(firstError[0]);
    } 

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError('');

        try {
            await coachService.create(form);
            navigate('/coaches');
        } catch(error: any) {
            handleApiError(error.response.data);
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className={ui.page}>
            <div className="flex gap-2 items-center">
                <Link to="/coaches" className={`${ui.muted} font-bold! text-2xl! cursor-pointer`}>←</Link>
                <h1 className={ui.title}>Criar Personal</h1>
            </div>
            <form onSubmit={handleSubmit} className={`mt-4 max-w-screen w-125 mx-auto`}>
                <h2 className={`${ui.subtitle} text-center mb-3`}>Novo Personal</h2>
                <input
                    className={`${ui.input} mb-2`}
                    placeholder="Nome"
                    value={form.name}
                    name="name"
                    type="text"
                    onChange={handleChange}
                    required
                />
                <input
                    className={`${ui.input} mb-2`}
                    placeholder="E-mail"
                    value={form.email}
                    name="email"
                    type="email"
                    onChange={handleChange}
                    required
                />
                <input
                    className={`${ui.input} mb-2`}
                    placeholder="Senha (pelo menos 8 dígitos)"
                    value={form.password}
                    name="password"
                    type="password"
                    minLength={8}
                    onChange={handleChange}
                    required
                />
                <input
                    className={`${ui.input} mb-2`}
                    placeholder="Telefone"
                    value={form.phone}
                    name="phone"
                    type="text"
                    onChange={handleChange}
                />
                <input
                    className={`${ui.input} mb-2`}
                    placeholder="CREF"
                    value={form.cref}
                    name="cref"
                    type="text"
                    onChange={handleChange}
                />
                {error && <span className={`${ui.feedbackError}`}>{error}</span>}

                <div className="flex gap-2 mt-2 justify-end">
                    <Link to='/coaches' className={ui.btnSecondary}>
                        Cancelar
                    </Link>
                    <button disabled={saving} type="submit" className={ui.btnPrimary}>
                        {saving ? 'Salvando...' : 'Salvar'}
                    </button>
                </div>

            </form>
        </div>
    );
}