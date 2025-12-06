const express = require('express')
const router = express.Router()
const { pedidoController } = require("../controllers/pedidosController")

router.post('/pedidos', pedidoController.criarPedido);

module.exports = {
    pedidosRoutes: router
}