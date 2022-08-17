const express = require('express');
const { listaCompleta, agregarInstrumento, editarInstrumento, borrarTodo, borrarInstrumento, listaDisponibles } = require('../controllers/instrumentos');
const router = express.Router();

router.get('/', listaDisponibles)
router.get('/listaCompleta', listaCompleta);
router.post('/agregar', agregarInstrumento);
router.put('/editar/:id', editarInstrumento);
router.delete('/borrar/:id', borrarInstrumento);
router.delete('/vaciar', borrarTodo);

module.exports = router;