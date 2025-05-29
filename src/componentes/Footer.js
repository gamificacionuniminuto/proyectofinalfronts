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
        width: '100%',
        position: 'fixed',
        bottom: 0,
        zIndex: 999,
        bgcolor: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        sx={{ width: '100%', maxWidth: 600 }}
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
    </Box>
  );
}

