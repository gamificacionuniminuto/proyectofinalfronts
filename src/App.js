import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './home.js';
import './home.css';
import Login from './paginas/login/LoginRegister';  
import Singin from './paginas/singin/singin.js'
import Profile from './paginas/profile/profile.js'
import Configuracion from './paginas/configuracion/configuracion.js';
import NewPassword from './paginas/newPassword/newPassword.js';


import { Link } from 'react-router-dom';
import NotFound from './NotFound.js';

function App() {
  return (


    <Router>
      <div className="app-container">
        <nav className="main-nav">
          <Link to="/home">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/singin">Singin</Link>
          <Link to="/perfil">perfil</Link>
          <Link to="/configuracion">Configuración</Link>
          <Link to="/clasesT">clasesT</Link>
          <Link to="/newPassword">newPassword</Link>
          {/* Puedes agregar más enlaces aquí según sea necesario */}
        </nav>
        {/* Puedes agregar un header/navbar común aquí si lo necesitas */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/singin" element={<Singin/>}/>
          <Route path="/perfil" element={<Profile/>}/>
          <Route path="/configuracion" element={<Configuracion/>}/>
          <Route path="/clasesTransicion" element={<clasesTransicion/>}/>
          <Route path="/newPassword" element={<NewPassword/>}/>
        
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* Puedes agregar un footer común aquí si lo necesitas */}
      </div>
    </Router>
  );
}

export default App;
