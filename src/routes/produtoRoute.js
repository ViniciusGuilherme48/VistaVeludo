const express = require("express");
const router = express.Router();
const { produtoController } = require("../controllers/produtoController")

router.get('/produtos', produtoController.listarProdutos);

router.post('/produtos', produtoController.cadastrarProduto);

router.put('/produtos/:idProduto', produtoController.atualizarProduto);

router.delete('/produtos/:idProduto', produtoController.deletarProduto);

module.exports = {produtoRoutes: router};