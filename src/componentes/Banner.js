import React from 'react';
import styled, { css } from 'styled-components';
import slider1 from '../assets/Slider/slider1.png';
import bannerCard from '../assets/thumbnails/bannerCard.png';
import Button from '../componentes/Button';
import { colorGreyLight, colorBlackDark } from '../ui/colores';

// Contenedor principal
const Container = styled.div`
  position: relative;
  width: 100%;
  height: 90vh;
  min-width: 320px;

  ${({ theme }) => css`
    @media (max-width: ${theme.breakpoints.laptop}) {
      height: 65vh;
    }
  `}
`;

// Imagen de fondo del banner
const BannerImage = styled.div`
  background-image: url(${slider1});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 90vh;

  ${({ theme }) => css`
    @media (max-width: ${theme.breakpoints.laptop}) {
      height: 65vh;
    }
  `}
`;

// Capa de superposición
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 90vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;

  ${({ theme }) => css`
    @media (max-width: ${theme.breakpoints.laptop}) {
      height: 65vh;
    }
  `}
`;

// Contenedor del contenido del banner
const BannerContent = styled.div`
  position: absolute;
  top: 35vh;
  left: 2%;
  width: 96%;
  height: 35vh;
  z-index: 1000;
  display: flex;
  justify-content: space-between;

  ${({ theme }) => css`
    @media (max-width: ${theme.breakpoints.laptop}) {
      top: 60%;
      left: 0;
      margin: 0 auto;
      max-width: 320px;
      position: relative;
    }
  `}
`;

// Contenedor de texto del banner
const BannerTexContent = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 45%;
  justify-content: space-between;

  ${({ theme }) => css`
    @media (max-width: ${theme.breakpoints.laptop}) {
      height: 20vh;
      min-width: 320px;
    }
  `}
`;

// Título del banner
const Titulo = styled.div`
  background-color: #2a7ae4;
  color: white;
  height: 6rem;
  width: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto', sans-serif;
  font-size: 4rem;

  ${({ theme }) => css`
    @media (max-width: ${theme.breakpoints.laptop}) {
      display: none;
    }
  `}
`;

// Subtítulo del banner
const SubTitulo = styled.div`
  font-family: 'Roboto', sans-serif;
  color: white;
  font-size: 2.5rem;
  margin-top: 1.5rem;

  ${({ theme }) => css`
    @media (max-width: ${theme.breakpoints.laptop}) {
      font-weight: 203;
      margin-left: 8%;
    }
  `}
`;

// Texto adicional del banner
const TextoBanner = styled.div`
  color: white;
  margin-top: 1rem;
  font-family: 'Roboto', sans-serif;
  font-weight: light;
  font-size: 1.2rem;

  ${({ theme }) => css`
    @media (max-width: ${theme.breakpoints.laptop}) {
      display: none;
    }
  `}
`;

// Imagen de la tarjeta del banner
const BannerCard = styled.img`
  max-height: 100%;
  border: 5px solid #2a7ae4;

  ${({ theme }) => css`
    @media (max-width: ${theme.breakpoints.laptop}) {
      display: none;
    }
  `}
`;

// Botón para pantallas pequeñas
const BotonVer = styled(Button)`
  align-self: center;

  ${({ theme }) => css`
    @media (min-width: ${theme.breakpoints.laptop}) {
      display: none;
    }
  `}
`;

// Componente principal del banner
const Banner = () => {
  return (
    <Container>
      <BannerImage>
        <BannerContent>
          <BannerTexContent>
            <Titulo>Front End</Titulo>
            <SubTitulo>Challenge React</SubTitulo>
            <BotonVer
              inputColor={colorBlackDark}
              bordercolor={colorGreyLight}
              backgroundColor={colorGreyLight}
              fontSize="1.5em"
              btnwidth="9rem"
              height="3rem"
            >
              Ver
            </BotonVer>
            <TextoBanner>
              Este challenge es una forma de aprendizaje. Es un mecanismo donde podrás comprometerte en la resolución de un problema para poder aplicar todos los conocimientos adquiridos en la formación React.
            </TextoBanner>
          </BannerTexContent>
          <BannerCard src={bannerCard} alt="Aluraflix Logo" />
        </BannerContent>
      </BannerImage>
      <Overlay />
    </Container>
  );
};

export default Banner;