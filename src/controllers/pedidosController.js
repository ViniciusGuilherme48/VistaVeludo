const { pedidoModel } = require("../models/pedidosModels")
const { itemModel } = require("../models/itemModel")

const pedidoController = {
    criarPedidoCompleto: async (req, res) => {
        try {
            const { idCliente, itens } = req.body;

        
            if (!idCliente || !Array.isArray(itens) || itens.length === 0) {
                return res.status(400).json({ erro: "idCliente e itens são obrigatórios" });
            }

            //Criar pedido e pegar ID
            const idPedido = await pedidoModel.criarPedido(idCliente);

            //Inserir todos os itens
            for (const item of itens) {
                if (!item.idProduto || !item.quantidade || !item.precoUnitario) {
                    return res.status(400).json({ erro: "Cada item deve ter idProduto, quantidade e precoUnitario" });
                }

                await itemModel.criarItem(
                    idPedido,
                    item.idProduto,
                    item.quantidade,
                    item.precoUnitario
                );
            }

            return res.status(201).json({
                mensagem: "Pedido criado com sucesso!",
                idPedido: idPedido
            });

        } catch (error) {
            console.error("Erro ao criar pedido:", error);
            return res.status(500).json({ erro: "Erro interno ao criar pedido" });
        }
    },

    listarPedidos: async (req, res) => {
        try {
            const pedidos = await pedidoModel.listarPedidos()

            res.status(200).json(pedidos)
        } catch (error) {
            console.error("Erro ao listar produtos", error)
            res.status(500).json({ error: 'Erro interno ao buscar os pedidos cadastrados '})
        }
    }


}

module.exports = {
    pedidoController
}