import { useForm, Controller } from 'react-hook-form';
import React, { useEffect, useState, useContext, useCallback } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue, grey } from '@mui/material/colors';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';
import { useSnackbar } from "notistack";
import { useNavigate } from 'react-router-dom';
import MyContext from '../Context';
import { styled } from '@mui/material/styles';
import { useDropzone } from 'react-dropzone';
import Resizer from 'react-image-file-resizer';


// Tema personalizado para Material UI
const theme = createTheme({
  palette: {
    primary: {
      main: blue[700],
    },
    secondary: {
      main: grey[400],
    },
  },
});

// Estilos personalizados para el botón de categorías (solo visible en pantallas grandes)
const CategoriaButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    display: 'none', // Ocultar el botón en pantallas pequeñas
  },
}));

// Estilo para el contenedor del dropzone (para subir imágenes)
const DropzoneContainer = styled('div')`
  border: 2px dashed #212121;
  border-radius: 4px;
  height:15rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #53585D;
  color: #212121;
  cursor: pointer;

  p {
    margin-top: 1rem;
  }
`;

function FormularioVideos() {
  const [acceptedFiles, setAcceptedFiles] = useState([]); // Para almacenar los archivos aceptados
  const [previewImage, setPreviewImage] = useState(null); // Para la previsualización de la imagen
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { forceUpdate } = useContext(MyContext);
  const [options, setOptions] = useState([]); // Para las categorías disponibles
  const [selectedOption, setSelectedOption] = useState(''); // Categoría seleccionada

  // Función para redirigir al inicio
  const volverMain = () => {
    navigate('/');
  };

  // Manejador de archivos para el dropzone
  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  // Función para manejar la carga de archivos
  const onDrop = useCallback((droppedFiles) => {
    const updatedFiles = [...acceptedFiles, ...droppedFiles];
    setAcceptedFiles(updatedFiles);

    const file = droppedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Definir el tamaño máximo de la imagen
        const maxWidth = 300;
        const maxHeight = 300;
        let width = image.width;
        let height = image.height;

        if (width > maxWidth || height > maxHeight) {
          const aspectRatio = width / height;
          if (width > height) {
            width = maxWidth;
            height = width / aspectRatio;
          } else {
            height = maxHeight;
            width = height * aspectRatio;
          }
        }

        // Redimensionar la imagen
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(image, 0, 0, width, height);

        // Convertir la imagen redimensionada a formato de URL
        const resizedImageDataUrl = canvas.toDataURL('image/jpeg');
        setPreviewImage(resizedImageDataUrl);
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  }, [acceptedFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // Obtener categorías desde el servidor
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/categorias');
        const data = await response.json();
        setOptions(data);
      } catch (error) {
        console.error('Error fetching data de la API:', error);
      }
    };

    fetchData();
  }, []);

  // Manejador de cambio de categoría seleccionada
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // Configuración de formulario con react-hook-form
  const { control, handleSubmit, reset, formState: { errors } } = useForm();

  // Función para enviar el formulario
  const onSubmit = async (data) => {
    try {
      // Subir la imagen a Cloudinary
      if (acceptedFiles.length > 0) {
        const formData = new FormData();
        formData.append('file', acceptedFiles[0]);
        formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
          formData
        );

        const { secure_url } = response.data;
        data.linkImagenVideo = secure_url;
      }

      // Enviar los datos del formulario al servidor
      const response = await axios.post('http://localhost:3001/videos', data);
      enqueueSnackbar('Video agregado correctamente', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });

      volverMain();
      forceUpdate();
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Hubo un problema, el video no pudo ser insertado', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
    }
  };

  // Función para borrar la imagen seleccionada
  const handleDelete = () => {
    setPreviewImage(null);
    setAcceptedFiles([]);
  };

  // Función para redirigir al formulario de categorías
  const iraCategoria = () => {
    navigate('/formulariocategoria');
  };

  // Función para resetear el formulario
  const resetForm = () => {
    reset();
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: "auto", backgroundColor: '#191919', paddingTop: '1rem', paddingBottom: '2rem', minWidth: '320px' }}>
        <Container maxWidth="xl">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid rowSpacing={5} container>
              <Grid item xs={12}>
                <Typography align='center' variant='h3' color="#ffffff">Nuevo video</Typography>
              </Grid>

              {/* Título del video */}
              <Grid item xs={12}>
                <Controller
                  name="titulo"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Titulo es requerido' }}
                  render={({ field }) => (
                    <div>
                      <TextField
                        {...field}
                        sx={{ backgroundColor: '#53585D', color: 'white' }}
                        variant="filled"
                        error={!!errors.titulo}
                        fullWidth
                        label="Título"
                        id="titulo"
                      />
                      {errors.titulo && (
                        <Typography variant="body2" color="error">
                          {errors.titulo.message}
                        </Typography>
                      )}
                    </div>
                  )}
                />
              </Grid>

              {/* Link del video */}
              <Grid item xs={12}>
                <Controller
                  name="linkVideo"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Link de video es requerido' }}
                  render={({ field }) => (
                    <div>
                      <TextField
                        {...field}
                        sx={{ backgroundColor: '#53585D', color: 'white' }}
                        variant="filled"
                        error={!!errors.linkVideo}
                        fullWidth
                        label="Link del video"
                        id="linkVideo"
                      />
                      {errors.linkVideo && (
                        <Typography variant="body2" color="error">
                          {errors.linkVideo.message}
                        </Typography>
                      )}
                    </div>
                  )}
                />
              </Grid>

              {/* Dropzone para la imagen */}
              <Grid item xs={12}>
                <DropzoneContainer {...getRootProps({ className: 'dropzone' })}>
                  {previewImage ? (
                    <img src={previewImage} alt="Preview" />
                  ) : (
                    <p>Arrastrar imagen aquí, o hacer click para seleccionar una foto</p>
                  )}
                  <input {...getInputProps()} />
                </DropzoneContainer>
                <div>{files}</div>
                {previewImage && (
                  <Button variant="contained" color="error" onClick={handleDelete}>Eliminar Imagen</Button>
                )}
              </Grid>

              {/* Categoría */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="categorias">Categoría</InputLabel>
                  <Controller
                    name="categoria"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Select
                        {...field}
                        labelId="categorias"
                        label="Categoría"
                        onChange={handleChange}
                      >
                        {options.map((option, index) => (
                          <MenuItem key={index} value={option.id}>{option.nombre}</MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>

              {/* Botones */}
              <Grid item xs={12}>
                <ButtonGroup variant="contained" fullWidth color="secondary">
                  <CategoriaButton onClick={iraCategoria}>Nueva Categoría</CategoriaButton>
                  <Button onClick={resetForm}>Limpiar</Button>
                  <Button type="submit">Guardar</Button>
                </ButtonGroup>
              </Grid>
            </Grid>
          </form>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default FormularioVideos;