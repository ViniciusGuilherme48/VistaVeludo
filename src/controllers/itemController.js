const { itemModel } = require("../models/itemModel")

const itemController = {
    criarItem: async (req, res) => {
        try {
            const {idPedido, idProduto} = req.body

            if (!idPedido || !idProduto) {
                return res.status(400).json({ erro: 'Campos obrigatorios'})
            }

            await itemModel.criarItem(idPedido, idProduto)
            res.status(201).json({ message: 'item cadastrado com sucesso'})
        } catch (error) {
            console.error('Erro ao cadastrar item', error)
            res.status(500).json({ erro: 'Erro interno ao cadastrar item'})
        }
    }
}

module.exports = {
    itemController
}