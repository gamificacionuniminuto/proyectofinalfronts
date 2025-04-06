import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './home.js';
import Login from './paginas/login/login.js'; // Asegúrate de que la ruta sea correcta
import './home.css'; // Importación de un archivo CSS
import Register from './paginas/register/register.js'
import Dashboard from './paginas/dashboard/dashboard.js'

import { Link } from 'react-router-dom';
import NotFound from './NotFound.js'; // Asegúrate de que la ruta sea correcta

function App() {
  return (
    // Dentro de tu return, antes del <Routes>

    <Router>
      <div className="app-container">
        <nav className="main-nav">
          <Link to="/">Inicio</Link>
          <Link to="/home">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/registrar">registrar</Link>
          
        </nav>
        {/* Puedes agregar un header/navbar común aquí si lo necesitas */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registrar" element={<Register />} /> 
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Ejemplo de cómo agregar más rutas: */}
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          {/* <Route path="/profile" element={<Profile />} /> */}

          {/* Ruta para manejar páginas no encontradas */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* Puedes agregar un footer común aquí si lo necesitas */}
      </div>
    </Router>
  );
}

export default App;
