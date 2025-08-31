

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
import Pago from './paginas/pago/pago.jsx'; // Asegúrate de que este componente exista
import Formulario from './paginas/pago/formulario.jsx'; // Asegúrate de que este componente exista

import JuegoNumeros from './paginas/juegos/NumerosImparesPares/JuegoNumeros.jsx'
// import EjercicioMatematicas from './paginas/EjercisiosMatematicos/EjercicioMatematicasSuma.jsx'
import JuegoFiguras from './paginas/JuegoFiguras/JuegoFiguras.jsx'
// import JuegoNumeros from './paginas/juegos/JuegoNumeros.jsx';
// import EjercicioMatematicas from './paginas/EjercisiosMatematicos/EjercicioMatematicasSuma.jsx';
import Contar50 from './paginas/juegos/Contar/contar50.jsx'; 
import Contar20 from './paginas/juegos/Contar/Contar20.jsx'; 
import NumerosGame from './paginas/JuegoVoz/NumerosVoz.jsx'; 
import FigureCounter from './paginas/juegos/RelacionNumerosFiguras/RelacionFiguras.jsx'; 
import AnimalCounterDs from './paginas/juegos/ContarFormaAsyds/ContarAsyds.jsx'; 
import CuentaHasta100 from './paginas/juegos/Contar/Contar100.jsx';
import OddNumbersGame from './paginas/juegos/NumerosImparesPares/Numerosimpares.jsx'; 
import EjercicioSuma from './paginas/juegos/EjercisiosMatematicos/sumaBasica.jsx'; 
import EjercicioResta from './paginas/juegos/EjercisiosMatematicos/restaBasica.jsx'; 
import JuegoComparacion from './paginas/juegos/Comparacion/mayormenor.jsx';
import JuegoPatrones from './paginas/juegos/Patrones/patrones.jsx'; 
import SumasLLevando from './paginas/juegos/EjercisiosMatematicos/sumasLLevando.jsx';
import RestasLLevando from './paginas/juegos/EjercisiosMatematicos/restasLLevando.jsx'; 
import ConocerTablasM from './paginas/juegos/EjercisiosMatematicos/conoceTablasM.jsx';
import TablasMultiplicar from './paginas/juegos/tablas/tablasMultiplicar.jsx'; 
import DivisionesBasicas from './paginas/juegos/EjercisiosMatematicos/divisionBasica.jsx'; 
import FigurasAvanzadas from './paginas/juegos/RelacionNumerosFiguras/figurasAvanzadas.jsx'; 
import FraccionesBasicas from './paginas/juegos/Fracciones/fraccionesBasicas.jsx';
import MedicionTiempo from './paginas/juegos/medicion/medicionTiempo.jsx'; // Asegúrate de que este componente exista
import MedicionUso from './paginas/juegos/medicion/usoMedida.jsx'; // Asegúrate de que este componente exista
import ProblemasMate from './paginas/juegos/EjercisiosMatematicos/problemasMate.jsx';
import GraficaPicto from './paginas/juegos/grafica/graficasPicto.jsx';
import PatronesSecuencia from './paginas/juegos/Patrones/patronesSecuencias.jsx'; // Asegúrate de que este componente exista
import ProblemasMate2 from './paginas/juegos/EjercisiosMatematicos/problemasMate2.jsx'; // Asegúrate de que este componente exista
import ProblemasMD1 from './paginas/juegos/EjercisiosMatematicos/problemasMD1.jsx'; // Asegúrate de que este componente exista
import OperacionCombinada from './paginas/juegos/EjercisiosMatematicos/operacionCombinada.jsx';


import MaterialPage from './paginas/materiales/materialeasPage.jsx'; 
import RepasaNUmeros from './paginas/materiales/repasaNumeros.jsx';
import Guia from './paginas/materiales/guia.jsx';
import FigurasGeometricas from './paginas/materiales/figurasGeometricas.jsx';
import JuegoBingo from './paginas/materiales/juegoBingo.jsx';
import ProblemasMD from './paginas/materiales/problemasMD.jsx';
import Multiplicacion from './paginas/materiales/Multiplicacion.jsx';
import Division from './paginas/materiales/Division.jsx';
import AsendenteDesendente from './paginas/materiales/asendenteDesendente.jsx';
import RelacionNumeros from './paginas/materiales/RelacionNumeros.jsx';



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
            <Route path="/oddnumbersgame" element={<OddNumbersGame />} /> {/* Ruta para el juego de números impares */}
            <Route path="/ejerciciosumasbasicas" element={<EjercicioSuma />} /> {/* Ruta para el ejercicio de suma básica */}
            <Route path="/ejerciciosrestas" element={<EjercicioResta />} /> {/* Ruta para el ejercicio de resta */}
            <Route path="/juegocomparacion" element={<JuegoComparacion />} /> {/* Ruta para el juego de comparación */}
            <Route path="/juegopatrones" element={<JuegoPatrones />} /> {/* Ruta para el juego de patrones */}
            <Route path="/sumasLLevando" element={<SumasLLevando />} /> {/* Ruta para el juego de sumas con llevadas */}
            <Route path="/restasLLevando" element={<RestasLLevando />} /> {/* Ruta para el juego de restas con llevadas */}
            <Route path="/conocetablasm" element={<ConocerTablasM />} /> {/* Ruta para el juego de conocer tablas de multiplicar */}
            <Route path="/tablasMultiplicar" element={<TablasMultiplicar />} /> {/* Ruta para el juego de tablas de multiplicar */}
            <Route path="/divisionesBasicas" element={<DivisionesBasicas />} /> {/* Ruta para el juego de divisiones básicas */}
            <Route path="/figurasAvanzadas" element={<FigurasAvanzadas />} /> {/* Ruta para el juego de figuras avanzadas */}
            <Route path="/fraccionesBasicas" element={<FraccionesBasicas />} /> {/* Ruta para el juego de fracciones básicas */}
            <Route path="/medicionTiempo" element={<MedicionTiempo />} /> {/* Ruta para el juego de medición de tiempo */}
            <Route path="/medicionUso" element={<MedicionUso />} /> {/* Ruta para el juego de uso de medida */}
            <Route path="/problemasMate" element={<ProblemasMate />} /> {/* Ruta para el juego de problemas matemáticos */}
            <Route path="/graficaPicto" element={<GraficaPicto />} /> {/* Ruta para el juego de gráficas pictográficas */}              
            <Route path="/patronesSecuencia" element={<PatronesSecuencia />} /> {/* Ruta para el juego de patrones y secuencias */}
            <Route path="/problemasMate2" element={<ProblemasMate2 />} /> {/* Ruta para el juego de problemas matemáticos avanzados */}
            <Route path="/problemasMD1" element={<ProblemasMD1 />} /> {/* Ruta para el juego de problemas de multiplicación y división */}
            <Route path="/operacionCombinada" element={<OperacionCombinada />} /> {/* Ruta para el juego de operaciones combinadas */}


            <Route path="/materiales" element={<ProtectedRoute><MaterialPage /></ProtectedRoute>} />
            <Route path="/numeros" element={<ProtectedRoute><RepasaNUmeros /></ProtectedRoute>} />
            <Route path="/guia" element={<ProtectedRoute><Guia /></ProtectedRoute>} />
            <Route path="/figurasgeometricas" element={<ProtectedRoute><FigurasGeometricas /></ProtectedRoute>} />
            <Route path="/juegobingo" element={<ProtectedRoute><JuegoBingo /></ProtectedRoute>} />
            <Route path="/problemasMD" element={<ProtectedRoute><ProblemasMD /></ProtectedRoute>} />
            <Route path="/multiplacacion" element={<ProtectedRoute><Multiplicacion /></ProtectedRoute>} />
            <Route path="/division" element={<ProtectedRoute><Division /></ProtectedRoute>} />
            <Route path="/asendentedesendente" element={<ProtectedRoute><AsendenteDesendente /></ProtectedRoute>} />
            <Route path="/relacionnumeros" element={<ProtectedRoute><RelacionNumeros /></ProtectedRoute>} />
         


            {/* Rutas protegidas */}
            <Route path="*" element={<NotFound />} />
            <Route path="/JuegoDiasSemana" element={<JuegoDiasSemana />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
