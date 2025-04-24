import React from "react";
import "./Footer.css";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <a href="/" className={window.location.pathname === '/' ? 'active' : ''}>Inicio</a>
          <a href="/servicios" className={window.location.pathname === '/servicios' ? 'active' : ''}>Quienes somos</a>
          <a href="/conntacto" className={window.location.pathname === '/contacto' ? 'active' : ''}>Contacto</a>
        </div>
        
        <div className="social-links">
          <a href="#"><FaFacebook /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaInstagram /></a>
        </div>
        
        <div className="footer-copyright">
          <p>&copy; {new Date().getFullYear()} AprendeKids</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;