import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';

const CategoriaForm = () => {
  // Estados para manejar las categorías y el estado de edición
  const [categorias, setCategorias] = useState([]);
  const [editingCategoria, setEditingCategoria] = useState(null);

  // Usamos react-hook-form para la gestión de formularios
  const { control, handleSubmit, reset, setValue } = useForm();

  // Función para cargar todas las categorías desde la API
  const loadCategorias = async () => {
    try {
      const response = await axios.get('/api/categorias');
      setCategorias(response.data); // Establecemos las categorías en el estado
    } catch (error) {
      console.error('Error al cargar categorías', error);
    }
  };

  // Cargar categorías al montar el componente
  useEffect(() => {
    loadCategorias();
  }, []);

  // Función para manejar el envío del formulario
  const onSubmit = async (data) => {
    try {
      if (editingCategoria) {
        // Si estamos editando una categoría, hacemos un PUT
        await axios.put(`/api/categorias/${editingCategoria.id}`, data);
        alert('Categoría actualizada con éxito');
      } else {
        // Si estamos creando una categoría, hacemos un POST
        await axios.post('/api/categorias', data);
        alert('Categoría creada con éxito');
      }
      reset(); // Reseteamos el formulario
      loadCategorias(); // Recargamos las categorías
      setEditingCategoria(null); // Restablecemos el estado de edición
    } catch (error) {
      console.error('Error al guardar categoría', error);
    }
  };

  // Función para manejar la edición de una categoría
  const handleEdit = (categoria) => {
    setEditingCategoria(categoria);
    setValue('nombre', categoria.nombre);
    setValue('descripcion', categoria.descripcion);
    setValue('color', categoria.color);
    setValue('codigoSeguridad', categoria.codigoSeguridad);
  };

  // Función para manejar la eliminación de una categoría
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/categorias/${id}`);
      alert('Categoría eliminada con éxito');
      loadCategorias(); // Recargamos las categorías después de la eliminación
    } catch (error) {
      console.error('Error al eliminar categoría', error);
    }
  };

  return (
    <div>
      <h2>{editingCategoria ? 'Editar Categoría' : 'Crear Categoría'}</h2>

      {/* Formulario para crear o editar una categoría */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nombre:</label>
          <Controller
            name="nombre"
            control={control}
            defaultValue=""
            render={({ field }) => <input {...field} required />}
          />
        </div>

        <div>
          <label>Descripción:</label>
          <Controller
            name="descripcion"
            control={control}
            defaultValue=""
            render={({ field }) => <textarea {...field} required />}
          />
        </div>

        <div>
          <label>Color:</label>
          <Controller
            name="color"
            control={control}
            defaultValue=""
            render={({ field }) => <input type="color" {...field} />}
          />
        </div>

        <div>
          <label>Código de Seguridad:</label>
          <Controller
            name="codigoSeguridad"
            control={control}
            defaultValue=""
            render={({ field }) => <input {...field} required />}
          />
        </div>

        <button type="submit">{editingCategoria ? 'Actualizar' : 'Guardar'}</button>
      </form>

      {/* Lista de categorías */}
      <h3>Lista de Categorías</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Color</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria.id}>
              <td>{categoria.nombre}</td>
              <td>{categoria.descripcion}</td>
              <td>{categoria.color}</td>
              <td>
                {/* Botones para editar y eliminar */}
                <button onClick={() => handleEdit(categoria)}>Editar</button>
                <button onClick={() => handleDelete(categoria.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriaForm;