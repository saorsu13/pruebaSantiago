require('dotenv').config();
const express = require('express');
const cors = require('cors');
const usuariosRoutes = require('./routes/usuariosRoutes');

const app = express();
const port = 5000;

const corsOptions = {
  origin: 'https://prueba-santiago-jet.vercel.app',
  optionsSuccessStatus: 200,
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Usar las rutas de usuarios
app.use('/api', usuariosRoutes);

app.listen(port, () => {
  console.log(`Servidor backend en http://localhost:${port}`);
});
