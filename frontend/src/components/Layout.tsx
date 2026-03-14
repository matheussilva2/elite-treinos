import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"
import { ui } from "../styles/ui";

export const Layout = ({ children }: { children: React.ReactNode }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async() => {
        await logout();
        navigate('/login');
    }

    return (
        <div className="min-h-screen">
            <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
                <span className="font-bold text-lg">Elite Treinos</span>
                {
                    user ? (
                        <div className="flex items-center gap-4">
                            <span className={ui.muted}>{user?.name}</span>
                            <button onClick={handleLogout} className={ui.btnGhost}>Sair</button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <button onClick={() => navigate('/login')} className={ui.btnGhost}>Entrar</button>
                        </div>
                    )
                }
            </header>
            <main>
                {children}
            </main>
        </div>
    );
}