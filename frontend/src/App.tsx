import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css'
import { AuthProvider } from "./contexts/AuthContext"
import { Login } from "./pages/auth/login"

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/login' element={<Login />} /> 
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}