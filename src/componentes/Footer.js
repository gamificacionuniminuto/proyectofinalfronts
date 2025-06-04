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
        minHeight: '25vh', // Mantiene el layout a altura completa
      }}
    >
      {/* Contenido principal */}
      <Box sx={{ flex: 1, p: 2 }}>
        {/* Tu contenido aquí */}
      </Box>

      {/* Footer al fondo */}
      <Box
        sx={{
          width: '97vw', // Forzar ancho completo de la ventana
          backdropFilter: 'blur(20px)',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          WebkitBackdropFilter: 'blur(12px)',
          borderTop: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 -1px 5px rgba(0, 0, 0, 0.1)',
          px: 2,
          py: 1,
        }}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => setValue(newValue)}
          sx={{
            width: '100%',
            maxWidth: 800,
            margin: '0 auto',
            backgroundColor: 'transparent',
            '& .MuiBottomNavigationAction-root': {
              color: 'black',
              mx: 1.5,
              minWidth: 100,
            },
            '& .Mui-selected': {
              color: '#45645',
            },
          }}
        >
          <BottomNavigationAction label="Inicio" icon={<HomeIcon />} href="/" />
          <BottomNavigationAction label="Quiénes somos" icon={<InfoIcon />} href="/servicios" />
          <BottomNavigationAction label="Contacto" icon={<ContactMailIcon />} href="/contacto" />
          <BottomNavigationAction icon={<FacebookIcon />} href="https://facebook.com" target="_blank" />
          <BottomNavigationAction icon={<TwitterIcon />} href="https://twitter.com" target="_blank" />
          <BottomNavigationAction icon={<InstagramIcon />} href="https://instagram.com" target="_blank" />
        </BottomNavigation>

        <Box sx={{ textAlign: 'center', mt: 1 }}>
          <p style={{ color: 'black', fontSize: '14px' }}>© AprendeKids® 2025.</p>
        </Box>
      </Box>
    </Box>
  );
}

