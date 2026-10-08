import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from "styled-components";
import logo from '../assets/LogoMain.png';
import Button from '../componentes/Button';

// Estilo para el contenedor del header
const HeaderContainer = styled.div`
    background-color: #000000;
    font-size: 32px;
    color: white;
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 320px;
    border-bottom: 2px solid #2A7AE4;
`;

// Estilo para el logo
const Logo = styled.img`
    max-height: 40%;
    margin-left: 2%;

    // Media query para dispositivos más pequeños
    ${props => css`
        @media (max-width: ${props.theme.breakpoints.laptop}) {
            margin: 0 auto;
        }
    `}
`;

// Componente Header
const Header = () => {
  // Hook para navegación
  const navigate = useNavigate();

  // Función para navegar a la página principal
  const volverMain = () => {
    navigate('/');
  }

  // Función para navegar a la página del formulario de videos
  function handleClick() {
    console.log("nada");
    navigate('/formulariovideos');
  }

  return (
    <HeaderContainer>
      {/* Logo que al hacer clic vuelve a la página principal */}
      <Logo src={logo} onClick={volverMain} alt="Aluraflix Logo" />

      {/* Botón para navegar a la página de "Nuevo Video" */}
      <Button
        onClick={handleClick}
        inputColor="white"
        bordercolor='white'
        marginR="2%"
        display='none'
        fontSize="1rem"
        btnwidth="8rem"
        height="3rem"
      >
        Nuevo Video
      </Button>
    </HeaderContainer>
  )
}

export default Header;