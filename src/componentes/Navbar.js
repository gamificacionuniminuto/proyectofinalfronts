import { Link, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./Navbar.css"; 

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  // Obtener datos del usuario del localStorage
  const localUser = JSON.parse(localStorage.getItem('user'));
  const isPremium = localUser?.isPremium === true;

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
          
          {/* Mostrar enlace de pago solo si NO es premium */}
          {!isPremium && (
            <Link
              to="/pago"
              className={location.pathname === '/pago' ? 'active' : ''}
            >
              Pagar curso
            </Link>
          )}

          {/* Opción alternativa: Mostrar el enlace deshabilitado si es premium */}
          {/* 
          <Link
            to={isPremium ? '#' : '/pago'}
            className={`${location.pathname === '/pago' ? 'active' : ''} ${
              isPremium ? 'disabled-link' : ''
            }`}
            onClick={e => isPremium && e.preventDefault()}
          >
            Pagar curso
            {isPremium && <span className="premium-badge">YA PREMIUM</span>}
          </Link>
          */}

          <Link
            to="/formulario"
            className={location.pathname === '/formulario' ? 'active' : ''}
          >
            Formulario
          </Link>
          <button onClick={logout} className="logout-button">
            Cerrar Sesión
          </button>
        </>
      )}
    </nav>
  );
};

export default Navbar;