import { useEffect, useState } from "react";
import { ui } from "../../../styles/ui";
import { type Coach, type Client } from "../../../types/User";
import { coachService } from "../../../services/coachService";
import { Link, useParams } from "react-router-dom";

const ClientsTable = ({clients}: {clients: Client[]}) => {
    return (
        <table className={ui.table}>
            <thead className={ui.tableHead}>
                <tr className={ui.tableRow}>
                    <th className={ui.tableTh}>#</th>
                    <th className={ui.tableTh}>Nome</th>
                    <th className={ui.tableTh}>Email</th>
                    <th className={ui.tableTh}>Nascimento</th>
                    <th className={ui.tableTh}>Observações</th>
                </tr>
            </thead>
            <tbody>
                {
                    clients.map((client) => (
                        <tr key={client.user.id} className={ui.tableRow}>
                            <td className={ui.tableTd}>{client.user.id}</td>
                            <td className={ui.tableTd}>{client.user.name}</td>
                            <td className={ui.tableTd}>{client.user.email}</td>
                            <td className={ui.tableTd}>
                                {
                                    client.birthdate ? (
                                        new Date(client.birthdate).toLocaleDateString('pt-BR')
                                    ) : ' - '
                                }
                            </td>
                            <td className={ui.tableTd}>{client.notes || " - "}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
}

export const CoachDetails = () => {
    const { id } = useParams<{id: string}>();

    const [loading, setLoading] = useState(false);
    const [coach, setCoach] = useState<Coach | null>(null);
    const [clients, setClients] = useState<Client[]>([]);

    const fetchCoach = async() => {
        try {
            setLoading(true);

            const [coachData, clients] = await Promise.all([
                coachService.get(Number(id)),
                coachService.clients(Number(id))
            ]);
            setCoach(coachData);
            setClients(clients);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCoach();
    }, []);

    return <div className={ui.page}>
        {
            loading ? "Carregando" : (
                <>
                <div className="mb-3">
                    <div className="flex gap-2 items-center">
                        <Link to="/coaches" className={`${ui.muted} !font-bold !text-2xl cursor-pointer`}>←</Link>
                        <h1 className={ui.title}>{coach?.user.name}</h1>
                    </div>
                    <p>{coach?.user.email}</p>
                    <div className="flex gap-4 mt-3">
                        {
                            coach?.cref && (
                                <span>
                                    CREF: <span className="font-bold">{coach?.cref}</span>
                                </span>
                            )
                        }
                        {
                            coach?.phone && (
                                <span>
                                    Telefone: <span className="font-bold">{coach?.phone}</span>
                                </span>
                            )
                        }
                    </div>
                    <div>
                        <h2 className={`${ui.subtitle} my-3`}>Clientes</h2>
                        {
                            clients.length === 0 ? (
                                <p className={ui.muted}>Nenhum cliente cadastrado.</p>
                            ) : (
                                <ClientsTable clients={clients} />
                            )
                        }
                    </div>
                </div>

                </>
            )
        }
    </div>;
}