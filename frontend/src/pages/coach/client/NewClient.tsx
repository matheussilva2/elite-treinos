import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { ui } from "../../../styles/ui";
import { clientService } from "../../../services/clientService";

interface ClientForm {
    name: string;
    email: string;
    password: string;
    birthdate: string;
    notes: string;
}

const clearedForm: ClientForm = {
    name: '',
    email: '',
    password: '',
    birthdate: '',
    notes: ''
};

export const NewClient = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState<ClientForm>(clearedForm);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
            await clientService.create(form);
            navigate('/clients');
        } catch(error: any) {
            handleApiError(error.response.data);
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className={ui.page}>
            <div className="flex gap-2 items-center">
                <Link to="/clients" className={`${ui.muted} font-bold! text-2xl! cursor-pointer`}>←</Link>
                <h1 className={ui.title}>Criar Aluno</h1>
            </div>
            <form onSubmit={handleSubmit} className={`mt-4 max-w-screen w-125 mx-auto`}>
                <h2 className={`${ui.subtitle} text-center mb-3`}>Novo Aluno</h2>
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
                <div className="flex flex-col gap-2">
                    <label htmlFor="birthdate" className={ui.muted}>Data de nascimento</label>
                    <input
                        className={`${ui.input} mb-2`}
                        value={form.birthdate}
                        name="birthdate"
                        type="date"
                        onChange={handleChange}
                    />
                </div>
                <textarea
                    className={`${ui.input} mb-2`}
                    placeholder="Observações"
                    value={form.notes}
                    name="notes"
                    onChange={handleChange}
                />
                {error && <span className={`${ui.feedbackError}`}>{error}</span>}

                <div className="flex gap-2 mt-2 justify-end">
                    <Link to='/clients' className={ui.btnSecondary}>
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