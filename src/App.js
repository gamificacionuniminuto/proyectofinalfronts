import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Navbar from './componentes/Navbar.js'; 
import Footer from './componentes/Footer.js'; // Asegúrate de que la ruta sea correcta

// Asegúrate de que la ruta sea correcta

import './paginas/Home/home.js'; // Importación de un archivo CSS
import Home from './paginas/Home/home.js';
import './paginas/Home/home.css'; // Importación de un archivo CSS
import Login from './paginas/login/LoginRegister';  
import Singin from './paginas/singin/singin.js';
import Profile from './paginas/profile/profile.js';
import Configuracion from './paginas/configuracion/configuracion.js';
import NewPassword from './paginas/newPassword/newPassword.js';
import ForgotPassword from './paginas/forgotpassword/ForgotPassword.js';
import { Link } from 'react-router-dom';
import NotFound from './NotFound.js';
import ProtectedRoute from './componentes/ProtectedRoute.js';

function App() {
  return (
    <Router>
      <div className="app-container"> {/* Contenedor principal */}
        <Navbar />
       

        <div className="main-content"> {/* Contenedor del contenido */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/singin" element={<Singin/>}/>
            <Route path="/perfil" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/configuracion" element={<ProtectedRoute><Configuracion /></ProtectedRoute>} />
            <Route path="/newPassword" element={<NewPassword/>}/>
            <Route path="/forgotPassword" element={<ForgotPassword/>}/>       
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        <Footer/>
      </div>
    </Router>
  );
}

export default App;
