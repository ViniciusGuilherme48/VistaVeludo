const { default: Message } = require("tedious/lib/message");
const { produtoModel } = require("../models/produtoModel");

const produtoController = {

    listarProdutos: async (req, res) => {

        try {

            const produtos = await produtoModel.buscarTodos();

            res.status(200).json(produtos);

        } catch (error) {

            console.error("Erro ao listar produtos", error);
            res.status(500).json({ error: 'Erro interno ao buscar produtos' });
        }
    },

    cadastrarProduto: async (req, res) => {
        try {

            const { nomeProduto, precoProduto, corProduto, tamanhoProduto, categoriaProduto, qtdeProduto } = req.body;

            if (nomeProduto == undefined || precoProduto == undefined || corProduto == undefined || tamanhoProduto == undefined || categoriaProduto == undefined || qtdeProduto == undefined || precoProduto == isNaN || qtdeProduto == isNaN) {
                return res.status(400).json({ erro: 'Campos obrigatorios não preenchidos' });
            }

            await produtoModel.cadastrarProduto(nomeProduto, precoProduto, corProduto, tamanhoProduto, categoriaProduto, qtdeProduto);
            res.status(201).json({ erro: 'Erro ao cadastrar produto' });

        } catch (error) {

            console.error('Erro ao cadastrar produto', error);
            res.status(500).json({ erro: 'Erro interno ao cadastrar produto' });

        }
    },

    //atualizar produtos cadastrados no banco de dados
    atualizarProduto: async (req, res) => {

        try {
            const { idProduto } = req.params;
            const { nomeProduto, precoProduto, qtdeProduto } = req.body;

            if (idProduto.length != 36) {
                return res.status(400).json({ error: 'id do produto invalido' })
            }

            const produto = await produtoModel.buscarUm(idProduto);

            if (!produto || produto.length !== 1) {
                return res.status(404).json({ error: 'produto não encontrado' });
            }

            const produtoAtual = produto[0];

            const nomeAtualizado = nomeProduto ?? produtoAtual.nomeProduto;

            const precoAtualizado = precoProduto ?? produtoAtual.precoProduto;

            const qtdeAtualizado = qtdeProduto ?? produtoAtual.qtdeProduto;

            await produtoModel.atualizarProduto(idProduto, nomeAtualizado, precoAtualizado, qtdeAtualizado);
            res.status(200).json({ Message: 'Produto atualizado com sucesso!' });

        } catch (error) {

            console.error('Erro ao atualizar produto', error);
            res.status(500).json({ erro: 'erro interno no servidor ao atualizar produto' });

        }
    },

    //Deletar produto cadastrado no banco de dados

    deletarProduto: async (req, res) => {

        try {

            const { idProduto } = req.params;

            if (idProduto.length != 36) {
                return res.status(400).json({ error: 'ID do produto invalido' });
            }

            await produtoModel.deletarProduto(idProduto);
            res.status(200).json({ message: 'Produto deletado com sucesso' });

        } catch (error) {

            console.error('erro ao deletar produto', error);
            res.status(500).json({ error: 'erro interno no servidor ao deletar produto' })
        }
    }
}

module.exports = { produtoController };