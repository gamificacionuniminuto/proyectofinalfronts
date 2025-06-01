import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function FooterNavigation() {
  const [value, setValue] = React.useState(0);

  return (
<Box
  sx={{
    display: 'flex',
    flexDirection: 'column',
    minHeight: '138vh',

    position: 'static',
    

  
  }}
>
  {/* Contenido principal */}
  <Box sx={{ flex: 1 }}>
    {/* Todo el contenido aquí */}
  </Box>

  {/* Footer debajo del contenido y con ancho total */}
  <Box
    sx={{
      width: '97vw', // 💡 Esto asegura que cubra el ancho total de la ventana
      backdropFilter: 'blur(20px)',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      WebkitBackdropFilter: 'blur(12px)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '4px',
      borderTop: '1px solid rgba(255, 255, 255, 0.3)',
      boxShadow: '0 -1px 5px rgba(0, 0, 0, 0.1)',
      padding: '12px 16px',
      height: '20px', 
    }}
  >
  <BottomNavigation
  showLabels
  value={value}
  onChange={(event, newValue) => setValue(newValue)}
  sx={{
    width: '100%',
    maxWidth: 800,
    backgroundColor: 'transparent',
    '& .MuiBottomNavigationAction-root': {
      backgroundColor: 'transparent',
      color: 'black', // color de los íconos
      mx: 1.5, // Margen horizontal entre íconos
      minWidth: 100, // Opcional: asegura tamaño mínimo
    },
    '& .Mui-selected': {
      color: '#45645', // azul para el ítem seleccionado (puedes cambiarlo)
    },
  }}
>
        <BottomNavigationAction
          label="Inicio"
          icon={<HomeIcon />}
          href="/"
        />
        <BottomNavigationAction
          label="Quiénes somos"
          icon={<InfoIcon />}
          href="/servicios"
        />
        <BottomNavigationAction
          label="Contacto"
          icon={<ContactMailIcon />}
          href="/contacto"
        />
        <BottomNavigationAction
          icon={<FacebookIcon />}
          href="https://facebook.com"
          target="_blank"
        />
        <BottomNavigationAction
          icon={<TwitterIcon />}
          href="https://twitter.com"
          target="_blank"
        />
        <BottomNavigationAction
          icon={<InstagramIcon />}
          href="https://instagram.com"
          target="_blank"
        />
      </BottomNavigation>
      
      <p style={{
        textAlign: 'center',
        color: 'black',
        fontSize: '20px',
        marginTop: '18px',
        width: '100%',
      }}>
        © AprendeKids® 2025.
      </p>
    </Box>
  </Box>
  );
}

