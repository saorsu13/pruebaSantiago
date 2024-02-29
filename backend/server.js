const express = require('express');
const cors = require('cors');
const usuariosRoutes = require('./routes/usuariosRoutes');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Ruta de la página de inicio
app.get('/', (req, res) => {
  res.send('¡Hola, esta es la página de inicio!');
});

// Usar las rutas de usuarios
app.use('/api', usuariosRoutes);

app.listen(port, () => {
  console.log(`Servidor backend en http://localhost:${port}`);
});
