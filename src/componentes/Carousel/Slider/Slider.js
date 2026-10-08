import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/swiper-bundle.css";
import styled, { css } from "styled-components";
import MyContext from "../../../Context";

// Componentes de estilo
const CategoryContainer = styled.div`
  color: #fff;
  display: flex;
  height: 5rem;
  align-items: center;
  & .textoCategoria {
    margin-left: 1rem;
    color: #f5f5f5;
  }
  @media screen and (min-width: 992px) {
    display: ${(props) => props.isHidden && "none"};
  }
`;

const CategoriaTitulo = styled.div`
  display: flex;
  background-color: ${(props) => props.categoriaColor};
  padding: 1rem;
  align-items: center;
  justify-content: center;
  font-family: "Roboto", sans-serif;
  font-size: 1.5rem;
`;

const SwiperContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const StyledSwiper = styled(Swiper)`
  padding: 20px 0;
  .swiper-button-prev,
  .swiper-button-next {
    color: #fff;
    font-size: 30px;
    &:hover {
      background-color: #257be5;
    }
  }
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
    z-index: 1;
  }
  img {
    border: 4px solid ${(props) => props.borderColor};
  }
`;

// Componente principal
const Slider = ({ categorias, videos }) => {
  const { handleVideoLoading } = useContext(MyContext);

  // Filtra categorías que tienen videos asociados
  const filteredCategories = categorias.filter((categoria) =>
    videos.some((video) => video.Categoria === categoria.categoriaNombre)
  );

  return (
    <SwiperContainer>
      {filteredCategories.map((categoria) => (
        <div key={categoria.categoriaNombre}>
          <CategoryContainer isHidden={categoria.categoriaNombre === "Front End"}>
            <CategoriaTitulo categoriaColor={categoria.categoriaColor}>
              {categoria.categoriaNombre}
            </CategoriaTitulo>
            <div className="textoCategoria">{categoria.categoriaTexto}</div>
          </CategoryContainer>
          <StyledSwiper
            spaceBetween={10}
            slidesPerView={4}
            navigation
            modules={[Navigation]}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              992: { slidesPerView: 3 },
              1200: { slidesPerView: 4 },
            }}
          >
            {videos
              .filter((video) => video.Categoria === categoria.categoriaNombre)
              .map((video) => (
                <StyledSwiperSlide
                  key={video.id}
                  borderColor={categoria.categoriaColor}
                  onClick={() => handleVideoLoading(video.linkVideo)}
                >
                  <Link to="/videoPlayer">
                    <img
                      className="videoImage"
                      src={video.linkImagenVideo}
                      alt={`Video relacionado a ${categoria.categoriaNombre}`}
                    />
                  </Link>
                </StyledSwiperSlide>
              ))}
          </StyledSwiper>
        </div>
      ))}
    </SwiperContainer>
  );
};

// Validación de Props
Slider.propTypes = {
  categorias: PropTypes.arrayOf(
    PropTypes.shape({
      categoriaNombre: PropTypes.string.isRequired,
      categoriaColor: PropTypes.string.isRequired,
      categoriaTexto: PropTypes.string,
    })
  ).isRequired,
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      Categoria: PropTypes.string.isRequired,
      linkVideo: PropTypes.string.isRequired,
      linkImagenVideo: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Slider;