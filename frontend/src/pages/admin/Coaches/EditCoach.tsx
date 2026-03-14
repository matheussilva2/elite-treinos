import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { coachService } from "../../../services/coachService";
import { ui } from "../../../styles/ui";
import type { Coach } from "../../../types/User";

interface CoachForm {
    name: string | undefined;
    email: string | undefined;
    password: string | undefined;
    phone: string | undefined;
    cref: string | undefined;
}

export const EditCoach = () => {
    const { id } = useParams<{id: string}>();
    const navigate = useNavigate();

    const [coach, setCoach] = useState<Coach | null>(null);
    const [form, setForm] = useState<CoachForm  | null>(null);
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchCoach = async() => {
        try {
            setLoading(true);
            const data = await coachService.get(Number(id));
            setCoach(data);
            setForm({
                name: data.user.name,
                email: data.user.email,
                password: '',
                phone: data.phone ?? '',
                cref: data.cref ?? ''
            });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCoach();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm(prev => prev ? ({ ...prev, [name]: value }) : prev);
    }

    const handleApiError = (data: any): void => {
        const firstError: any = Object.values(data.errors)[0];
        
        setError(firstError[0]);
    } 

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        if(!form) return;

        setSaving(true);
        setError('');

        try {
            await coachService.update(Number(id), {
                ...form,
                password: form.password || undefined
            });
            navigate('/coaches');
        } catch(error: any) {
            handleApiError(error.response.data);
        } finally {
            setSaving(false);
        }
    }

    if(!coach && !loading)  {
        return <div className={ui.page}>
            <div className="flex gap-2 items-center">
                <Link to="/coaches" className={`${ui.muted} font-bold! text-2xl! cursor-pointer`}>←</Link>
                <h1 className={ui.title}>Editar Personal</h1>
            </div>
            
            <p className={ui.muted}>Coach não encontrado!</p>
        </div>
    }

    return (
        <div className={ui.page}>
            <div className="flex gap-2 items-center">
                <Link to="/coaches" className={`${ui.muted} font-bold! text-2xl! cursor-pointer`}>←</Link>
                <h1 className={ui.title}>Editar Personal</h1>
            </div>
            {
                loading ? 'carregando...' : (
                    <form onSubmit={handleSubmit} className={`mt-4 max-w-screen w-125 mx-auto`}>
                        <h2 className={`${ui.subtitle} text-center mb-3`}>Novo Personal</h2>
                        <input
                            className={`${ui.input} mb-2`}
                            placeholder="Nome"
                            value={form.name}
                            name="name"
                            type="text"
                            onChange={handleChange}
                        />
                        <input
                            className={`${ui.input} mb-2`}
                            placeholder="E-mail"
                            value={form.email}
                            name="email"
                            type="email"
                            onChange={handleChange}
                        />
                        <input
                            className={`${ui.input} mb-2`}
                            placeholder="Senha (pelo menos 8 dígitos)"
                            value={form.password}
                            name="password"
                            type="password"
                            minLength={8}
                            onChange={handleChange}
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
                )
            }
        </div>
    );
}