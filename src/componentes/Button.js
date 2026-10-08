import React from 'react';
import styled, { css } from "styled-components";

// Componente estilizado para el botón
const Button = styled.button`
  /* Estilo básico del botón */
  display: inline-block; /* Botón como elemento en línea con formato de bloque */
  color: ${props => props.inputColor}; /* Color del texto del botón */
  background-color: ${props => props.backgroundColor || "transparent"}; /* Fondo del botón, por defecto transparente */
  width: ${props => props.btnwidth || 'auto'}; /* Ancho dinámico basado en props o automático */
  height: ${props => props.height || 'auto'}; /* Altura dinámica basada en props o automática */

  font-size: ${props => props.fontSize}; /* Tamaño de fuente dinámico basado en props */
  font-family: 'Source Sans Pro', sans-serif; /* Fuente personalizada para el texto del botón */

  margin-right: ${props => props.marginR || '0'}; /* Margen derecho dinámico */
  margin-left: ${props => props.ml || '0'}; /* Margen izquierdo dinámico */

  border: 2px solid ${props => props.bordercolor}; /* Borde con color dinámico */
  border-radius: 3px; /* Bordes redondeados */
  display: block; /* Bloque para alineación fácil en contenedores */

  /* Media query para dispositivos pequeños */
   ${props => css`
   @media (max-width: ${props.theme.breakpoints.laptop}) {
      display: ${props => props.display}; /* Control de visibilidad en pantallas pequeñas */
   }
`}
`;

// Exporta el componente para su uso en otros archivos
export default Button;