import { Link, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./Navbar.css"; 

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  // Eliminamos la condición que oculta el navbar en ciertas rutas
  // if (hiddenRoutes.includes(location.pathname)) return null;

  return (    
    <nav className="navbar">
      <Link 
        to="/home" 
        className={location.pathname === '/home' ? 'active' : ''}
      >
        Quienes Somos
      </Link>
      
      {/* Mostrar Iniciar Sesión y Registro solo si NO hay usuario logueado */}
      {!user && (
        <>
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
        </>
      )}
      
      {/* Mostrar enlaces protegidos solo si HAY usuario logueado */}
      {user && (
        <>
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
          <button 
            onClick={logout}
            className="logout-button"
          >
            Cerrar Sesión
          </button>
        </>
      )}
      
   
    </nav>
  );
};

export default Navbar;