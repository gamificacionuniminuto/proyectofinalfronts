import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './componentes/Navbar.js'; 
import Footer from './componentes/Footer.js'; 
import Home from './paginas/Home/home.js';
import './paginas/Home/home.css'; 
import Login from './paginas/login/LoginRegister.js';  
import Singin from './paginas/singin/singin.js';
import Profile from './paginas/profile/profile.js';
import Configuracion from './paginas/configuracion/configuracion.js';
import NewPassword from './paginas/newPassword/newPassword.js';
import ForgotPassword from './paginas/forgotpassword/ForgotPassword.js';
import NotFound from './NotFound.js';
import ProtectedRoute from './componentes/ProtectedRoute.js';
import Ejercicio1 from './paginas/primero/Ejercicio1.jsx';
import Clases from './paginas/clases/clases.jsx'; 
import ProgresoNivel from './componentes/ProgresoNivel.jsx';
import JuegoNumeros from './paginas/juegos/JuegoNumeros.jsx';
import EjercicioMatematicas from './paginas/EjercisiosMatematicos/EjercicioMatematicasSuma.jsx';
import Contar50 from './paginas/juegos/contar50.jsx'; 
import Contar20 from './paginas/juegos/Contar20.jsx'; // Asegúrate de que este componente exista

function RutaConProgreso() {
  const location = useLocation();
  const rutasConProgreso = ['/clases'];

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
}

function App() {
  return (
    
    <Router>
      <Navbar />

      {/* Componente que controla cuándo mostrar el progreso */}
      <RutaConProgreso />

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
          <Route path="/Ejercicio1" element={<Ejercicio1 />} />
          <Route path="/clases" element={<Clases />} /> {/* Incluí la ruta para Clases */}
          <Route path="/juegonumeros" element={<JuegoNumeros/>} />
          <Route path="/resta" element={<EjercicioMatematicas/>} />
          <Route path="/juegosNumeros" element={<JuegoNumeros />} />
          {/* //<Route path="/numerosVoz" element={<NumerosGame />} /> */}
          {/* Asegúrate de que la ruta sea correcta para el componente de juego de números */}
          <Route path="/contar50" element={<Contar50/>} />
          <Route path='/ejerciciosmatematicassuma' element={<EjercicioMatematicas />} />
          <Route path="/contar20" element={<Contar20 />} /> 


          {/* Rutas protegidas */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </div>

      <Footer />
    </Router>
    
  );
}

export default App;
