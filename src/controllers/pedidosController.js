const { pedidoModel } = require("../models/pedidosModels")

const pedidoController = {
    criarPedido: async (req, res) => {
        try {
            const {
                nomeCliente,
                nomeProduto,
                categoriaProduto,
                qtdeProduto
            } = req.body

            if (nomeCliente == undefined || nomeProduto == undefined || categoriaProduto == undefined || qtdeProduto == isNaN(qtdeProduto)) {
                return res.status(400).json({ erro: 'Campos obrigatorios'})
            }

            await pedidoModel.criarPedido(nomeCliente, nomeProduto, categoriaProduto, qtdeProduto)
            res.status(201).json({ 
                erro: 'Pedido Cadastrado com sucesso'
            })
        } catch (error) {
            console.error('Erro ao cadastrar o pedido', error)
            res.status(500).json({ 
                erro: 'Erro interno ao cadastrar o pedido'
            })
        }
    }
}

module.exports = {
    pedidoController
}