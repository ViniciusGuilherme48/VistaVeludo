const express = require("express")
const router = express.Router()
const { pedidoController } = require("../controllers/pedidosController")

router.post('/pedidos', pedidoController.criarPedidoCompleto)

router.get('/pedidos', pedidoController.listarPedidos)

module.exports = {
    pedidosRoutes: router
}