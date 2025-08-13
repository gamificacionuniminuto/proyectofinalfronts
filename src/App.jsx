import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatBot from './componentes/Chatgpt.jsx';
import Navbar from './componentes/Navbar.js';
import ProtectedRoute from './componentes/ProtectedRoute.js';

import Home from './paginas/Home/home.js';
import './paginas/Home/home.css';
import Login from './paginas/login/LoginRegister.js';
import Singin from './paginas/singin/singin.js';
import Profile from './paginas/profile/profile.js';
import Configuracion from './paginas/configuracion/configuracion.js';
import NewPassword from './paginas/newPassword/newPassword.js';
import ForgotPassword from './paginas/forgotpassword/ForgotPassword.js';
import NotFound from './NotFound.js';
import Ejercicio1 from './paginas/primero/Ejercicio1.jsx';
import Clases from './paginas/clases/clases.jsx';
import Pago from './paginas/pago/pago.jsx';
import Formulario from './paginas/pago/formulario.jsx';
import JuegoUnidadMedida from './paginas/juegos/JuegoUnidadMedida/JuegoUnidadMedida.jsx';
import JuegoNumeros from './paginas/juegos/NumerosImparesPares/JuegoNumeros.jsx';
import JuegoFiguras from './paginas/juegos/JuegoFiguras/JuegoFiguras.jsx';
import Contar50 from './paginas/juegos/Contar/contar50.jsx';
import Contar20 from './paginas/juegos/Contar/Contar20.jsx';
import NumerosGame from './paginas/juegos/JuegoVoz/NumerosVoz.jsx';
import FigureCounter from './paginas/juegos/RelacionNumerosFiguras/RelacionFiguras.jsx';
import AnimalCounterDs from './paginas/juegos/ContarFormaAsyds/ContarAsyds.jsx';
import CuentaHasta100 from './paginas/juegos/Contar/Contar100.jsx';
import JuegoDescomposicion from './paginas/juegos/JuegoDescomposicion/JuegoDescomposicion.jsx';
import JuegoFracciones from './paginas/juegos/JuegoFracciones/JuegoFracciones.jsx';
import JuegoTiempo from './paginas/juegos/JuegoTiempo/JuegoTiempo.jsx';
import ProblemasSimples from './paginas/juegos/ProblemasSimples/ProblemasSimples.jsx';
import OddNumbersGame from './paginas/juegos/NumerosImparesPares/Numerosimpares.jsx';
import EjercicioSuma from './paginas/juegos/EjercisiosMatematicos/sumaBasica.jsx';
import EjercicioResta from './paginas/juegos/EjercisiosMatematicos/restaBasica.jsx';
import JuegoComparacion from './paginas/juegos/Comparacion/mayormenor.jsx';
import JuegoPatrones from './paginas/juegos/Patrones/patrones.jsx';
import MaterialPage from './paginas/materiales/materialeasPage.jsx';
import JuegoBingo from './paginas/materiales/juegoBingo.jsx';
import JuegoDiasSemana from './paginas/juegos/JuegoDiasSemana/JuegoDiasSemana.jsx';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/singin" element={<Singin />} />
            <Route path="/perfil" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/Chatbot" element={<ProtectedRoute><ChatBot /></ProtectedRoute>} />
            <Route path="/pago" element={<Pago />} />
            <Route path="/formulario" element={<Formulario />} />
            <Route path="/configuracion" element={<ProtectedRoute><Configuracion /></ProtectedRoute>} />
            <Route path="/newPassword" element={<NewPassword />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/Ejercicio1" element={<Ejercicio1 />} />
            <Route path="/clases" element={<Clases />} />
            <Route path="/juegonumeros" element={<JuegoNumeros />} />
            <Route path="/juegosnumeros" element={<JuegoNumeros />} />
            <Route path="/numerosvoz" element={<NumerosGame />} />
            <Route path="/JuegoFiguras" element={<JuegoFiguras />} />
            <Route path="/contar50" element={<Contar50 />} />
            <Route path="/contar20" element={<Contar20 />} />
            <Route path="/figurecounter" element={<FigureCounter />} />
            <Route path="/animalcounterds" element={<AnimalCounterDs />} />
            <Route path="/cuentahasta100" element={<CuentaHasta100 />} />
            <Route path="/JuegoDescomposicion" element={<JuegoDescomposicion />} />
            <Route path="/JuegoFracciones" element={<JuegoFracciones />} />
            <Route path="/JuegoTiempo" element={<JuegoTiempo />} />
            <Route path="/oddnumbersgame" element={<OddNumbersGame />} />
            <Route path="/ejerciciosumasbasicas" element={<EjercicioSuma />} />
            <Route path="/ejerciciosrestas" element={<EjercicioResta />} />
            <Route path="/juegocomparacion" element={<JuegoComparacion />} />
            <Route path="/juegopatrones" element={<JuegoPatrones />} />
            <Route path="/ProblemasSimples" element={<ProblemasSimples />} />
            <Route path="/JuegoUnidadMedida" element={<JuegoUnidadMedida />} />
            <Route path="/materiales" element={<ProtectedRoute><MaterialPage /></ProtectedRoute>} />
            <Route path="/juegobingo" element={<ProtectedRoute><JuegoBingo /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
            <Route path="/JuegoDiasSemana" element={<JuegoDiasSemana />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
