import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ChatBot from './componentes/Chatgpt.jsx';
//import './componentes/
import Navbar from './componentes/Navbar.js'; 

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

import JuegoNumeros from './paginas/juegos/NumerosImparesPares/JuegoNumeros.jsx'
// import EjercicioMatematicas from './paginas/EjercisiosMatematicos/EjercicioMatematicasSuma.jsx'
import JuegoFiguras from './paginas/JuegoFiguras/JuegoFiguras.jsx'
// import JuegoNumeros from './paginas/juegos/JuegoNumeros.jsx';
// import EjercicioMatematicas from './paginas/EjercisiosMatematicos/EjercicioMatematicasSuma.jsx';
import Contar50 from './paginas/juegos/Contar/contar50.jsx'; 
import Contar20 from './paginas/juegos/Contar/Contar20.jsx'; // Asegúrate de que este componente exista
import NumerosGame from './paginas/JuegoVoz/NumerosVoz.jsx'; // Asegúrate de que este componente exista
import FigureCounter from './paginas/juegos/RelacionNumerosFiguras/RelacionFiguras.jsx'; // Asegúrate de que este componente exista
import AnimalCounterDs from './paginas/juegos/ContarFormaAsyds/ContarAsyds.jsx'; // Asegúrate de que este componente exista
import CuentaHasta100 from './paginas/juegos/Contar/Contar100.jsx'; // Asegúrate de que este componente exista
import OddNumbersGame from './paginas/juegos/NumerosImparesPares/Numerosimpares.jsx'; // Asegúrate de que este componente exista
import EjercicioSuma from './paginas/juegos/EjercisiosMatematicos/sumaBasica.jsx'; // Asegúrate de que este componente exista
import EjercicioResta from './paginas/juegos/EjercisiosMatematicos/restaBasica.jsx'; // Asegúrate de que este componente exista
import JuegoComparacion from './paginas/juegos/Comparacion/mayormenor.jsx'; // Asegúrate de que este componente exista
import JuegoPatrones from './paginas/juegos/Patrones/patrones.jsx'; // Asegúrate de que este componente exista





function App() {
  return (
    <div className="App">
   
    
      <Router>
        <Navbar />

        {/* Componente que controla cuándo mostrar el progreso */}


        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/singin" element={<Singin />} />
            <Route path="/perfil" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/Chatbot" element={<ProtectedRoute><ChatBot/></ProtectedRoute>} />
            
            <Route path="/configuracion" element={<ProtectedRoute><Configuracion /></ProtectedRoute>} />
            <Route path="/newPassword" element={<NewPassword />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/Ejercicio1" element={<Ejercicio1 />} />
            <Route path="/clases" element={<Clases />} /> {/* Incluí la ruta para Clases */}
            <Route path="/juegonumeros" element={<JuegoNumeros/>} />
            {/* <Route path="/resta" element={<EjercicioMatematicas/>} /> */}
            <Route path="/juegosnumeros" element={<JuegoNumeros />} />
            <Route path="/numerosvoz" element={<NumerosGame />} />
            <Route path="/JuegoFiguras" element={<JuegoFiguras/>} />
            <Route path="/juegosNumeros" element={<JuegoNumeros />} />
            {/* //<Route path="/numerosVoz" element={<NumerosGame />} /> */}
            {/* Asegúrate de que la ruta sea correcta para el componente de juego de números */}
            <Route path="/contar50" element={<Contar50/>} />
            {/* <Route path='/ejerciciosmatematicassuma' element={<EjercicioMatematicas />} /> */}
            <Route path="/contar20" element={<Contar20 />} /> 
            <Route path="/figurecounter" element={<FigureCounter />} />
            <Route path="/animalcounterds" element={<AnimalCounterDs />} />
            <Route path="/cuentahasta100" element={<CuentaHasta100 />} />
            <Route path="/oddnumbersgame" element={<OddNumbersGame />} /> {/* Ruta para el juego de números impares */}
            <Route path="/ejerciciosumasbasicas" element={<EjercicioSuma />} /> {/* Ruta para el ejercicio de suma básica */}
            <Route path="/ejerciciosrestas" element={<EjercicioResta />} /> {/* Ruta para el ejercicio de resta */}
            <Route path="/juegocomparacion" element={<JuegoComparacion />} /> {/* Ruta para el juego de comparación */}
            <Route path="/juegopatrones" element={<JuegoPatrones />} /> {/* Ruta para el juego de patrones */}
            

         


            {/* Rutas protegidas */}
            <Route path="*" element={<NotFound />} />

          </Routes>
        </div>

      </Router>
    </div>
  );
}

export default App;