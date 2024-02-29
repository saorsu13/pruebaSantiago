import React from 'react';
import Header from '../components/Header';

const Settings = () => {
  const handleLogout = () => {
    // Agrega aquí la lógica para cerrar sesión
    // Por ejemplo, eliminar la información de autenticación almacenada
    // y redirigir al usuario a la página de inicio de sesión
    console.log('Cerrar sesión...');
  };

  return (
    <div>
      <Header />
      <div className="content">
        <h2>Configuración</h2>
        <button onClick={handleLogout}>Cerrar Sesión</button>
      </div>
    </div>
  );
};

export default Settings;
