const { sql, getConnection } = require("../config/db");

const produtoModel = {
    //Buscar todos os produtos cadastrados
    buscarTodos: async () => {

        try {

            const pool = await getConnection();

            let querySQL = "SELECT * FROM Produtos";

            const result = await pool.request().query(querySQL);

            return result.recordset;

        } catch (error) {

            console.error("erro ao buscar produtos", error);
            throw error;

        }
    },

    //Buscar apenas um produtos
    buscarUm: async (idProduto) => {

        try {

            const pool = await getConnection();

            const querySQL = `SELECT *FROM Produtos WHERE idProduto = @idProduto`;

            const result = await pool.request()
                .input('idProduto', sql.UniqueIdentifier, idProduto)
                .query(querySQL);

        } catch (error) {

            console.error('erro ao buscar o produto', error);
            throw error;

        }
    },

    //Cadastrar produtos no banco de dados
    cadastrarProduto: async (nomeProduto, precoProduto, corProduto, tamanhoProduto, categoriaProduto, qtdeProduto) => {

        try {

            const pool = await getConnection();

            let querySQL = `INSERT INTO Produto (nomeProduto, precoProduto, corProduto, tamanhoProduto, categoriaProduto, qtdeProduto) VALUES (@nomeProduto, @precoProduto, @corProduto, @tamanhoProduto, @categoriaProduto, @qtdeProduto)`;

            await pool.request()
                .input('nomeProduto', sql.VarChar(100), nomeProduto)
                .input('precoProduto', sql.Decimal(10, 2), precoProduto)
                .input('corProduto', sql.VarChar(100), corProduto)
                .input('tamanhoProduto', sql.VarChar(1), tamanhoProduto)
                .input('categoriaProduto', sql.VarChar(50), categoriaProduto)
                .input('qtdeProduto', sql.int(), qtdeProduto)
                .query(querySQL);

        } catch (error) {

            console.error('Erro ao cadastrar produto', error)
            throw error;

        }
    },

    //Atualizar produtos cadastrados no banco de dados
    atualizarProduto: async (idProduto, nomeProduto, precoProduto, qtdeProduto) => {

        try {

            const pool = await getConnection();

            const querySQL = `UPDATE Produtos SET nomeProduto = @nomeProduto,
            precoProduto = @precoProduto WHERE idProduto = @idProduto`

            await pool.request()
                .input('nomeProduto', sql.VarChar(100), nomeProduto)
                .input('precoProduto', sql.Decimal(10, 2), precoProduto)
                .input('qtdeProduto', sql.int(), qtdeProduto)
                .input('idProduto', sql.UniqueIdentifier, idProduto)
                .query(querySQL);

        } catch (error) {

            console.error('Erro ao atualizar produto', error);
            throw error;

        }
    },

    //Deletar produtos cadastrados no banco de dados
    deletarProduto: async (idProduto) => {

        try {
            const pool = await getConnection();

            const querySQL = `DELETE FROM Produtos WHERE idProduto = @idProduto`;

            await pool.request()
                .input('idProduto', sql.UniqueIdentifier, idProduto)
                .query(querySQL);

        } catch (error) {

            console.error('Erro ao deletar produto', error);
            throw error;

        }

    }

}
module.exports = { produtoModel };