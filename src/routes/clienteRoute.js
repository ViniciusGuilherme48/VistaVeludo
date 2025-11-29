const express = require('express');
const router = express.Router();
const { clienteController } = require("../controllers/clienteController");
const { verify } = require("../middlewares/authMiddleware");
const { authController} = require("../controllers/authController");

//Rota get para listar todos os clientes
router.get('/clientes', clienteController.listarCliente);

//Rota post para cadastro de clientes
router.post('/clientes', clienteController.cadastrarCliente);

//Rota put para atualização de cadastros de clientes
router.put('/clientes/:idCliente', clienteController.atualizarCliente);

//Rota delete para deletar clientes
router.delete('/cliente/:idCliente', clienteController.deletarCliente);

module.exports = { clienteRoutes: router };