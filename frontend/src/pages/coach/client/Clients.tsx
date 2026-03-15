import { useEffect, useState } from "react";
import type { Client } from "../../../types/User";
import { ui } from "../../../styles/ui";
import { Link } from "react-router-dom";
import { clientService } from "../../../services/clientService";

export const Clients = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(false);

    const deleteClient = async(client: Client) => {
        if(!confirm(`Apagar dados de ${client.user.name}?`)) return;

        await clientService.delete(client.user.id);
        fetchClients();
    }

    const fetchClients = async() => {
        try {
            setLoading(true);
            const data = await clientService.index();
            setClients(data);
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=> {
        fetchClients();
    }, []);

    return <div className={`${ui.page}`}>
        <div className="flex justify-between mb-3">
            <h1 className={ui.title}>Alunos</h1>
            <Link to='/clients/create' className={`${ui.btnPrimary}`}>+ Novo Aluno</Link>
        </div>
        <div className="max-w-full overflow-x-scroll">
        {
            loading? "Carregando..." : (
                <table className={ui.table}>
                    <thead className={ui.tableHead}>
                        <tr className={ui.tableRow}>
                            <th className={ui.tableTh}>#</th>
                            <th className={ui.tableTh}>Nome</th>
                            <th className={ui.tableTh}>Email</th>
                            <th className={ui.tableTh}>Data de Nascimento</th>
                            <th className={ui.tableTh}>Observações</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            clients.length <= 0 ?
                            <span className={ui.muted}>Nenhum cliente cadastrado</span> :
                            (
                            clients.map((client) => (
                                <tr key={client.user.id} className={ui.tableRow}>
                                    <td className={ui.tableTd}>{client.user.id}</td>
                                    <td className={ui.tableTd}>{client.user.name}</td>
                                    <td className={ui.tableTd}>{client.user.email}</td>
                                    <td className={ui.tableTd}>
                                        {
                                            client.birthdate?
                                            new Date(client.birthdate).toLocaleDateString('pt-BR'):
                                            " - "
                                        }
                                    </td>
                                    <td className={ui.tableTd}>{client.notes || " - "}</td>
                                    <td className={`${ui.tableTd} whitespace-nowrap`}>
                                        <div className="flex gap-1 justify-end flex-wrap">
                                            <Link to={`/clients/${client.user.id}`} className={ui.btnPrimary}>
                                                <img
                                                    src="/assets/icons/eye.svg"
                                                    className="w-5 min-w-5 h-5"
                                                    alt="Ver dados" />
                                            </Link>
                                            <Link to={`/clients/${client.user.id}/edit`} className={ui.btnWarning}>
                                                <img
                                                    src="/assets/icons/pencil.svg"
                                                    className="w-5 min-w-5 h-5"
                                                    alt="Editar dados"
                                                />
                                            </Link>
                                            <button onClick={() => deleteClient(client)} className={ui.btnDanger}>
                                                <img
                                                    src="/assets/icons/trash.svg"
                                                    className="w-5 min-w-5 h-5"
                                                    alt="Apagar"
                                                />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                            )
                        }
                    </tbody>
                </table>
            )
        }
        </div>
    </div>
}