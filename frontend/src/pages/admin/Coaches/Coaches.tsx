import { useEffect, useState } from "react";
import type { Coach } from "../../../types/User";
import { ui } from "../../../styles/ui";
import { coachService } from "../../../services/coachService";
import { Link } from "react-router-dom";

export const Coaches = () => {
    const [coaches, setCoaches] = useState<Coach[]>([]);
    const [loading, setLoading] = useState(false);

    const deleteCoach = async(coach: Coach) => {
        if(!confirm(`Apagar dados de ${coach.user.name}?`)) return;

        await coachService.delete(coach.user.id);
        fetchCoaches();
    }

    const fetchCoaches = async() => {
        try {
            setLoading(true);
            const data = await coachService.index();
            setCoaches(data);
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=> {
        fetchCoaches();
    }, []);

    return <div className={`${ui.page}`}>
        <div className="flex justify-between mb-3">
            <h1 className={ui.title}>Coaches</h1>
            <Link to='/coaches/create' className={`${ui.btnPrimary}`}>+ Novo Personal</Link>
        </div>
        {
            loading? "Carregando..." : (
                <table className={ui.table}>
                    <thead className={ui.tableHead}>
                        <tr className={ui.tableRow}>
                            <th className={ui.tableTh}>#</th>
                            <th className={ui.tableTh}>Nome</th>
                            <th className={ui.tableTh}>Email</th>
                            <th className={ui.tableTh}>Telefone</th>
                            <th className={ui.tableTh}>CREF</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            coaches.length <= 0 ? 
                            <span className={ui.muted}>Nenhum personal cadastrado</span> :
                            coaches.map((coach) => (
                                <tr key={coach.user.id} className={ui.tableRow}>
                                    <td className={ui.tableTd}>{coach.user.id}</td>
                                    <td className={ui.tableTd}>{coach.user.name}</td>
                                    <td className={ui.tableTd}>{coach.user.email}</td>
                                    <td className={ui.tableTd}>{coach.phone || " - "}</td>
                                    <td className={ui.tableTd}>{coach.cref || " - "}</td>
                                    <td className={`${ui.tableTd} flex gap-1 justify-end`}>
                                        <Link to={`/coaches/${coach.user.id}`} className={ui.btnPrimary}>
                                            <img src="/assets/icons/eye.svg" alt="Ver dados" />
                                        </Link>
                                        <Link to={`/coaches/${coach.user.id}/edit`} className={ui.btnWarning}>
                                            <img src="/assets/icons/pencil.svg" alt="Editar dados" />
                                        </Link>
                                        <button onClick={() => deleteCoach(coach)} className={ui.btnDanger}>
                                            <img src="/assets/icons/trash.svg" alt="Apagar" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            )
        }
    </div>
}