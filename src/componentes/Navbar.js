
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css"; 

const Navbar = () => {
  const location = useLocation();

  return (    
    <nav className="navbar">
      <Link 
        to="/home" 
        className={location.pathname === '/home' ? 'active' : ''}
      >
        Inicio
      </Link>
      <Link 
        to="/singin" 
        className={location.pathname === '/singin' ? 'active' : ''}
      >
        Iniciar Sesión
      </Link>
      <Link 
        to="/LoginRegister" 
        className={location.pathname === '/LoginRegister' ? 'active' : ''}
      >
        Registro
      </Link>
      <Link 
        to="/profile" 
        className={location.pathname === '/profile' ? 'active' : ''}
      >
        Perfil
      </Link>
      <Link 
        to="/configuracion" 
        className={location.pathname === '/configuracion' ? 'active' : ''}
      >
        Configuración
       </Link> 
      <Link
        to="/clasesTransicion" 
        className={location.pathname === '/clasesTransicion' ? 'active' : ''}
      >   
        ClasesTransicion  
      </Link>   
        

    </nav>
  );
};

// Corrige el nombre al exportar (de "NAvbar" a "Navbar")
export default Navbar; 