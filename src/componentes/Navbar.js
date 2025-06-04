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
        to="/JuegoNumeros" 
        className={location.pathname === '/JuegoNumeros' ? 'active' : ''}
      >
        Juegos de Números
      </Link>
        
        <Link
        to="/JuegoFiguras" 
        className={location.pathname === '/JuegoFiguras' ? 'active' : ''}
      >
        Juegos de Figuras
      </Link>
      <Link
        to="/resta" 
        className={location.pathname === '/resta' ? 'active' : ''}
      >
        Ejercicio de Matemáticas
      </Link>
      <Link
        to="/contar50" 
        className={location.pathname === '/contar50' ? 'active' : ''}
      >
        Contar hasta 50
      </Link>
      <Link
        to="/Contar20" 
        className={location.pathname === '/Contar20' ? 'active' : ''}
      >
       Contar hasta 20
      </Link>
      <Link
        to="/JuegoDescomposicion" 
        className={location.pathname === '/JuegoDescomposicion' ? 'active' : ''}
      >
       Juego Descomposición
      </Link>
      <Link
        to="/JuegoFracciones" 
        className={location.pathname === '/JuegoFracciones' ? 'active' : ''}
      >
       Juego Fracciones
      </Link>
      <Link
        to="/JuegoTiempo" 
        className={location.pathname === '/JuegoTiempo' ? 'active' : ''}
      >
       Juego Medición del Tiempo
      </Link>     
      <Link
        to="/JuegoMedidas" 
        className={location.pathname === '/JuegoMedidas' ? 'active' : ''}
      >
       Juego Unidades de medida
      </Link>
    </nav>
  );
};

// Corrige el nombre al exportar (de "NAvbar" a "Navbar")
export default Navbar; 