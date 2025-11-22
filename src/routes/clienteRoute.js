const express = require('express');
const router = express.Router();
const { clienteController } = require("../controllers/clienteController");

//Rota get para listar todos os clientes
router.get('/clientes', clienteController.listarCliente);

//Rota post de cadastro de  clientes no banco de dados
router.post('/clientes', clienteController.cadastrarCliente);

router.put('/clientes/:idCliente', clienteController.atualizarCliente);

router.delete('/cliente/:idCliente', clienteController.deletarCliente);

module.exports = { clienteRoutes: router };