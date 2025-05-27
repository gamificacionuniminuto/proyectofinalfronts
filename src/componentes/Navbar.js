import { Link, useLocation } from "react-router-dom";
import "./Navbar.css"; 

const Navbar = () => {
  const location = useLocation();
  const hiddenRoutes = ['/perfil', '/configuracion']
  // Oculta completamente el navbar en la ruta /perfil
   if (hiddenRoutes.includes(location.pathname)) return null;;

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
        to="/login" 
        className={location.pathname === '/login' ? 'active' : ''}
      >
        Registro
      </Link>
      <Link 
        to="/perfil" 
        className={location.pathname === '/perfil' ? 'active' : ''}
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
        to="/Ejercicio1" 
        className={location.pathname === '/Ejercicio1' ? 'active' : ''}
      >
        Primero
       </Link>
       
        <Link
        to="/clases" 
        className={location.pathname === '/clases' ? 'active' : ''}
        >
        Clases
        </Link>

    </nav>
  );
};

// Corrige el nombre al exportar (de "NAvbar" a "Navbar")
export default Navbar; 