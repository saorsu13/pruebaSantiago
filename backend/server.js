const express = require('express');
const cors = require('cors');
const usuariosRoutes = require('./routes/usuariosRoutes');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Usar las rutas de usuarios
app.use('/api', usuariosRoutes);

app.listen(port, () => {
  console.log(`Servidor backend en http://localhost:${port}`);
});
