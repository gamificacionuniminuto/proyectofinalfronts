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
        to="/clases" 
        className={location.pathname === '/clases' ? 'active' : ''}
        >
        Clases
        </Link>

      <Link
        to="/EjerciciosP" 
        className={location.pathname === '/EjerciciosP' ? 'active' : ''}
      >
        Ejercicio Primero
      </Link>

      <Link
        to="/juegosNumeros" 
        className={location.pathname === '/juegosNumeros' ? 'active' : ''}
      >
        Juegos de Números
      </Link>
        
        <Link
        to="/JuegoFiguras" 
        className={location.pathname === '/JuegoFiguras' ? 'active' : ''}
      >
        Juegos de Figuras
      </Link>

    </nav>
  );
};

// Corrige el nombre al exportar (de "NAvbar" a "Navbar")
export default Navbar; 