import React from 'react';
import { Outlet } from "react-router-dom";
import Header from '../componentes/Header';  // Importación del componente Header

// Componente principal para el Layout de la raíz
function RootLayout() {
  return (
    <div className="root-layout">
      {/* Componente Header que se muestra en la parte superior de la página */}
      <Header />

      {/* Contenedor principal donde se renderizarán las rutas hijas usando Outlet */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;