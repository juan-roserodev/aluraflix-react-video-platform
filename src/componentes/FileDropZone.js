import React, { useCallback, useState } from 'react';
import { Button } from '@mui/material';
import { useDropzone } from 'react-dropzone';

const FileDropzone = () => {
  const [selectedFiles, setSelectedFiles] = useState([]); // Estado para almacenar los archivos seleccionados

  // Función que maneja los archivos soltados
  const onDrop = useCallback((acceptedFiles) => {
    setSelectedFiles(acceptedFiles); // Actualiza el estado con los archivos aceptados
  }, []);

  // Extrae las funciones de 'react-dropzone' para la interacción con el área de arrastre
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      {/* Área de arrastre para archivos */}
      <div {...getRootProps()} style={{ marginBottom: '1rem' }}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here...</p> // Mensaje cuando el archivo está siendo arrastrado
        ) : (
          <p>Drag and drop files here, or click to select files</p> // Mensaje predeterminado
        )}
      </div>

      {/* Mostrar los archivos seleccionados */}
      {selectedFiles.length > 0 && (
        <div>
          <h4>Selected Files:</h4>
          {selectedFiles.map((file) => (
            <div key={file.name}>
              <p>{file.name}</p>
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                style={{ maxWidth: '200px' }} // Muestra una vista previa de la imagen
              />
            </div>
          ))}
        </div>
      )}

      {/* Botón de subida, deshabilitado si no hay archivos seleccionados */}
      <Button variant="contained" color="primary" disabled={selectedFiles.length === 0}>
        Upload
      </Button>
    </>
  );
};

export default FileDropzone;