import { useEffect, useState } from "react";
import { ui } from "../../../styles/ui";
import { type Client } from "../../../types/User";
import { Link, useParams } from "react-router-dom";
import type { ClientWorkout } from "../../../types/Workout";
import { clientService } from "../../../services/clientService";
import { AddWorkoutsModal } from "./components/AddWorkoutsModal";

const WorkoutsTable = ({workouts}: {workouts: ClientWorkout[]}) => {
    return (
        <table className={ui.table}>
            <thead className={ui.tableHead}>
                <tr className={ui.tableRow}>
                    <th className={ui.tableTh}>Código</th>
                    <th className={ui.tableTh}>Nome</th>
                    <th className={ui.tableTh}>Objetivo</th>
                </tr>
            </thead>
            <tbody>
                {
                    workouts.map((workout) => (
                        <tr key={workout.id} className={ui.tableRow}>
                            <td className={ui.tableTd}>Treino {workout.workout.code}</td>
                            <td className={ui.tableTd}>{workout.workout.name}</td>
                            <td className={ui.tableTd}>{workout.workout.goal}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
}

export const ClientDetails = () => {
    const { id } = useParams<{id: string}>();

    const [loading, setLoading] = useState(false);
    const [client, setClient] = useState<Client | null>(null);
    const [workouts, setWorkouts] = useState<ClientWorkout[]>([]);
    const [addWorkoutOpen, setAddWorkoutOpen] = useState(false);

    const fetchClient = async() => {
        try {
            setLoading(true);

            const [clientData, workoutsData] = await Promise.all([
                clientService.get(Number(id)),
                clientService.workouts(Number(id))
            ]);
            setClient(clientData);
            setWorkouts(workoutsData);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchClient();
    }, []);

    return <div className={ui.page}>
        {
            loading ? "Carregando" : (
                <>
                <div className="mb-3">
                    <div className="flex gap-2 items-center">
                        <Link to="/coaches" className={`${ui.muted} !font-bold !text-2xl cursor-pointer`}>←</Link>
                        <h1 className={ui.title}>{client?.user.name}</h1>
                    </div>
                    <p>{client?.user.email}</p>
                    <div className="flex gap-4 mt-3">
                        {
                            client?.birthdate && (
                                <span>
                                    Data de nascimento:&nbsp;
                                    <span className="font-bold">
                                        {new Date(client.birthdate).toLocaleDateString('pt-BR')}
                                    </span>
                                </span>
                            )
                        }
                        {
                            client?.notes && (
                                <span>
                                    Telefone: <span className="font-bold">{client?.notes}</span>
                                </span>
                            )
                        }
                    </div>
                    <div>
                        <h2 className={`${ui.subtitle} my-3`}>Treinos</h2>
                        {
                            workouts.length < 2 && (
                                <div className="mb-2">
                                    <button onClick={() => setAddWorkoutOpen(true)} className={ui.btnPrimary}>Adicionar treino</button>
                                </div>
                            )
                        }
                        {
                            workouts.length === 0 ? (
                                <p className={ui.muted}>Nenhum treino cadastrado.</p>
                            ) : (
                                <WorkoutsTable workouts={workouts} />
                            )
                        }
                    </div>
                </div>
                {
                    (client && addWorkoutOpen) && 
                    (
                        <AddWorkoutsModal
                            isOpen={addWorkoutOpen}
                            client={client}
                            setOpen={setAddWorkoutOpen}
                            callback={fetchClient}
                        />
                    )
                }
                </>
            )
        }
    </div>;
}