import './styles/reset.css';
import theme from './styles/theme';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Banner from '../src/componentes/Banner';
import Footer from './componentes/Footer';
import MainSection from './componentes/MainSection';
import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import MyContext from '../src/Context';
import VideoPlayer from './componentes/Carousel/Slider/VideoPlayer';
import FormularioCategoria from './componentes/FormularioCategoria';
import FormularioVideos from './componentes/FormularioVideos';
import { SnackbarProvider } from "notistack";
import RootLayout from './layouts/RootLayout';

function App() {
  // Estado para almacenar las categorías obtenidas desde el servidor
  const [categorias, setCategorias] = useState([]);

  // Estado para almacenar los videos obtenidos desde el servidor
  const [videos, setVideos] = useState([]);

  // Estado para almacenar el video que se está reproduciendo
  const [videoToPlay, setVideoToPlay] = useState();

  // Reducer para forzar actualizaciones del componente
  const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);

  // Efecto para obtener categorías desde el servidor
  useEffect(() => {
    axios.get('http://localhost:3001/categorias')
      .then(response => setCategorias(response.data))
      .catch(error => console.error(error));
  }, [reducerValue]);

  // Efecto para obtener videos desde el servidor
  useEffect(() => {
    axios.get('http://localhost:3001/videos')
      .then(response => setVideos(response.data))
      .catch(error => console.error(error));
  }, [reducerValue]);

  // Maneja la selección de un video para reproducirlo
  const handleVideoLoading = (videoUrl) => {
    console.log(videoUrl);
    setVideoToPlay(videoUrl);
  };

  // Configuración de rutas para la aplicación
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<MainSection categorias={categorias} videos={videos} />} />
        <Route path="/formulariovideos" element={<FormularioVideos />} />
        <Route path="/videoPlayer" element={<VideoPlayer />} />
        <Route path="/formulariocategoria" element={<FormularioCategoria />} />
      </Route>
    )
  );

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={2000}>
        <main>
          <MyContext.Provider value={{ handleVideoLoading, setVideoToPlay, videoToPlay, forceUpdate }}>
            <RouterProvider router={router} />
            <Footer />
          </MyContext.Provider>
        </main>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;