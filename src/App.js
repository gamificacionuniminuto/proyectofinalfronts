import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import React from 'react';
import Navbar from './componentes/Navbar.js'; 
import Footer from './componentes/Footer.js'; 
import './paginas/Home/home.js';
import Home from './paginas/Home/home.js';
import './paginas/Home/home.css'; 
import Login from './paginas/login/LoginRegister';  
import Singin from './paginas/singin/singin.js';
import Profile from './paginas/profile/profile.js';
import Configuracion from './paginas/configuracion/configuracion.js';
import NewPassword from './paginas/newPassword/newPassword.js';
import ForgotPassword from './paginas/forgotpassword/ForgotPassword.js';
import NotFound from './NotFound.js';
import ProtectedRoute from './componentes/ProtectedRoute.js';
import EjerciciosP from './paginas/primero/EjerciciosP.js';
import Clases from './paginas/clases/clases.js';
import ProgresoNivel from './componentes/ProgresoNivel'; 
import JuegoNumeros from './paginas/juegos/JuegoNumeros.jsx'; // Asegúrate de que la ruta sea correcta

function App() {
  const RutaConProgreso = () => {
  const location = useLocation();
  const rutasConProgreso = [ '/clases'];

  const mostrarProgreso = rutasConProgreso.includes(location.pathname);

  return (
    <>
      {mostrarProgreso && (
        <div style={{ padding: '20px' }}>
          <ProgresoNivel userId={"id-del-usuario"} />
        </div>
      )}
    </>
  );
};
  return (
    <Router>
      <div className="app-container">
        <Navbar />
          <RutaConProgreso /> {/* Barra de puntos por nivel */}
        {/* Solo mostrar el SkillsMap en la página de inicio y clases */}


        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/singin" element={<Singin />} />
            <Route path="/perfil" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/configuracion" element={<ProtectedRoute><Configuracion /></ProtectedRoute>} />
            <Route path="/newPassword" element={<NewPassword />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/EjerciciosP" element={<EjerciciosP />} />
            <Route path="/clases" element={<Clases />} />
            <Route path="/juegosNumeros" element={<JuegoNumeros />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

// Componente para manejar la visibilidad de SkillMap según la ruta


export default App;
