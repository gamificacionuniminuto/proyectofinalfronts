import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './componentes/Navbar.js'
import './App.css';
import Home from './home.js';
import  { AuthProvider } from './componentes/AuthContext.js'

import Login from './paginas/login/LoginRegister';  
import Singin from './paginas/singin/singin.js'
import Profile from './paginas/profile/profile.js'
import Configuracion from './paginas/configuracion/configuracion.js';
import NewPassword from './paginas/newPassword/newPassword.js';
import ForgotPassword from './paginas/forgotpassword/ForgotPassword.js'

import NotFound from './NotFound.js';
import ProtectedRoute from './componentes/ProtectedRoute.js';
import PublicRoute from './componentes/PublicRoute.js';


function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />

            {/* ✅ Rutas públicas (solo si NO estás autenticado) */}
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/singin"
              element={
                <PublicRoute>
                  <Singin />
                </PublicRoute>
              }
            />
            <Route
              path="/forgotPassword"
              element={
                <PublicRoute>
                  <ForgotPassword />
                </PublicRoute>
              }
            />
            <Route
              path="/newPassword"
              element={
                <PublicRoute>
                  <NewPassword />
                </PublicRoute>
              }
            />

            {/* 🔐 Rutas protegidas (solo si estás autenticado) */}
            <Route
              path="/perfil"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/configuracion"
              element={
                <ProtectedRoute>
                  <Configuracion />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;