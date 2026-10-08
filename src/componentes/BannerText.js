import React from 'react';
import styled, { css } from "styled-components";

// Estilo del título del banner
const Title = styled.h1`
  background-color: #6BD1FF; /* Fondo azul claro */
  color: red; /* Texto de color rojo */
`;

const BannerText = () => {
  return (
    <div>
      {/* Título principal del componente BannerText */}
      <Title>BannerText</Title>
    </div>
  );
};

export default BannerText;