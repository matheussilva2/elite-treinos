import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { Coaches } from "./pages/admin/Coaches/Coaches";
import { Login } from "./pages/auth/Login";
import { CoachDetails } from "./pages/admin/Coaches/CoachDetails";
import { NewCoach } from "./pages/admin/Coaches/NewCoach";
import { EditCoach } from "./pages/admin/Coaches/EditCoach";
import { Layout } from "./components/Layout";
import { Clients } from "./pages/coach/client/Clients";
import { ClientDetails } from "./pages/coach/client/ClientDetails";
import { NewClient } from "./pages/coach/client/NewClient";
import { EditClient } from "./pages/coach/client/EditClient";

function PrivateRoute({ children, roles }: { children: React.ReactNode, roles: string[] }) {
  const { user, loading } = useAuth();

  if(loading) return <div>carregando...</div>;
  if(!user) return <Navigate to='/login' />;
  if(!roles.includes(user.role)) return <Navigate to='/login' />;

  return <>{children}</>;
}

function CheckRole() {
  const { user, loading } = useAuth();

  if(loading) return <div>carregando...</div>;
  if(!user) return <Navigate to='/login'/>

  if(user.role === 'superadmin') return <Navigate to='/coaches' />;
  if(user.role === 'coach') return <Navigate to='/clients' />;

  return <Navigate to='/my-workouts' />;
}

export default function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<CheckRole />} />
          <Route path='/login' element={<Login />} /> 

          {/* Rotas de admin */}
          <Route path='/coaches' element={
            <PrivateRoute roles={['superadmin']}>
              <Layout>
                <Coaches />
              </Layout>
            </PrivateRoute>
          } />
          <Route path='/coaches/:id' element={
            <PrivateRoute roles={['superadmin']}>
              <Layout>
                <CoachDetails />
              </Layout>
            </PrivateRoute>
          } />
          <Route path='/coaches/create'
            element={
              <PrivateRoute roles={['superadmin']}>
                <Layout>
                  <NewCoach />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route path='/coaches/:id/edit'
            element={
              <PrivateRoute roles={['superadmin']}>
                <Layout>
                  <EditCoach />
                </Layout>
              </PrivateRoute>
            }
          />

          {/* Rotas de personal */}
          <Route path='/clients'
            element={
              <PrivateRoute roles={['coach']}>
                <Layout>
                  <Clients />
                </Layout>
              </PrivateRoute>
            }
          />

          <Route path='/clients/:id' element={
            <PrivateRoute roles={['coach']}>
              <Layout>
                <ClientDetails />
              </Layout>
            </PrivateRoute>
          } />
          <Route path='/clients/create'
            element={
              <PrivateRoute roles={['coach']}>
                <Layout>
                  <NewClient />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route path='/clients/:id/edit'
            element={
              <PrivateRoute roles={['coach']}>
                <Layout>
                  <EditClient />
                </Layout>
              </PrivateRoute>
            }
          />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}