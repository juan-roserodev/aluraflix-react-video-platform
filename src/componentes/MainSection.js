import React, { useState, useEffect } from 'react';
import Slider from './Carousel/Slider/Slider';
import Banner from '../componentes/Banner';
import styled, { css } from "styled-components";

// Estilo para el contenedor principal de la sección
const MainSectionContainer = styled.div`
    background-color: #191919;
    padding: 2rem;

    // Media query para pantallas más pequeñas
    ${props => css`
        @media (max-width: ${props.theme.breakpoints.laptop}) {
            padding-top: 1.5rem;
        }
    `}
`;

// Componente Principal de la Sección
function MainSection({ categorias, videos }) {
  return (
    <>
      {/* Componente de Banner */}
      <Banner />

      {/* Contenedor principal para el contenido */}
      <MainSectionContainer>
        {/* Componente Slider que recibe categorías y videos como props */}
        <Slider categorias={categorias} videos={videos} />
      </MainSectionContainer>
    </>
  );
}

export default MainSection;