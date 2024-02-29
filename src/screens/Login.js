import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/modal';
import '../styles/LoginStyle.css'

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleIniciarSesion = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: correo,
    password: contrasena,
  }),
});

console.log("Respuesta del servidor:", response);

if (!response.ok) {
  const errorDetails = await response.json();
  console.error('Error al iniciar sesión:', errorDetails || 'Detalles no disponibles');
  setError('Credenciales incorrectas. Verifica tu correo y contraseña.');
  setIsModalOpen(true);
  return;
}

const data = await response.json();
console.log("Datos de la respuesta:", data);

const token = data.token;

if (token) {
  localStorage.setItem('token', token);
  console.log('Token recibido:', token);
  navigate('/Home');
} else {
  console.error('Token no recibido en la respuesta del servidor.');
}
} catch (error) {
  console.error('Error al iniciar sesión:', error);
  setError('Ocurrió un error al iniciar sesión. Por favor, intenta de nuevo.');
  setIsModalOpen(true);
}
};

  const handleRegistroClick = () => {
    navigate('/register');
  };
  const handleCloseModal = () => {
    setError('');
    setIsModalOpen(false);
  };

  return (
    <div className="contenedor-centrado">
      <img src="/iconoblanco.png" alt="Ícono del banco" className="icono-banco" />
      <h1 className="nombre-banco">FinanziaBank</h1>
      <p>Confianza para tu futuro financiero</p>
      <h2>Inicia Sesión</h2>
      <label>Correo electronico:</label>
      <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} />
      <label>Contraseña:</label>
      <input type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
      <button onClick={handleIniciarSesion}>Iniciar Sesión</button>
       <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        message={error}
        color="#D23642"
      />
      <p className="registro" onClick={handleRegistroClick}>¿No tienes una cuenta? Regístrate aquí</p>
    </div>
  );
};

export default Login;
