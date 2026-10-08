import React from 'react';
import styled, { css } from "styled-components";
import logo from '../assets/LogoMain.png';

// Contenedor del footer con estilo básico
const FooterContainer = styled.div`
    background-color: #000000; /* Fondo negro */
    font-size: 32px; /* Tamaño de fuente */
    color: white; /* Color de texto blanco */
    height: 15vh; /* Altura del footer */
    display: flex; /* Establece un layout flexible */
    align-items: top; /* Alineación de los elementos al inicio del contenedor */
    justify-content: center; /* Centra los elementos horizontalmente */
    min-width: 320px; /* Ancho mínimo */
    border-top: 2px solid #2A7AE4; /* Borde superior azul */
    padding-top: 1rem; /* Espaciado superior */
`;

// Estilo del logo con ajustes para pantallas pequeñas
const Logo = styled.img`
    height: 3rem; /* Tamaño del logo */
    margin-left: 2%; /* Margen izquierdo del logo */
    
    /* Estilo responsivo para pantallas pequeñas */
    ${props => css`
    @media (max-width: ${props.theme.breakpoints.laptop}) {
      margin: 0 auto; /* Centra el logo en pantallas pequeñas */
    }
  `}
`;

function Footer() {
  return (
    <FooterContainer>
      <Logo src={logo} alt="Aluraflix Logo" /> {/* Logo del footer */}
    </FooterContainer>
  );
}

export default Footer;