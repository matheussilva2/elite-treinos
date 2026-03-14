import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { Coaches } from "./pages/admin/Coaches/Coaches";
import { Login } from "./pages/auth/Login";
import { CoachDetails } from "./pages/admin/Coaches/CoachDetails";
import { NewCoach } from "./pages/admin/Coaches/NewCoach";
import { EditCoach } from "./pages/admin/Coaches/EditCoach";
import { Layout } from "./components/Layout";

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

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}