const express = require('express');
const router = express.Router();
const { iniciarSesion } = require('../controllers/usuariosController');
const { crearUsuario } = require('../controllers/usuariosController');


router.post('/login', iniciarSesion);
router.post('/register', crearUsuario);

module.exports = router;
