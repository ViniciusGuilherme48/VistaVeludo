const {sql, getConnection} = require("../config/db");

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
            .input('idproduto', sql.UniqueIdentifier, idProduto)
            .query(querySQL);

        } catch (error) {
            
            console.error('erro ao buscar o produto', error);
            throw error;

        }
    },

    cadastrarProduto: async (nomeProduto, precoProduto, corProduto, tamanhoProduto, categoriaProduto, qtdeProduto) => {
       
        try {
            const pool = await getConnection();
            
            let querySQL = `INSERT INTO Produto (nomeProduto, precoProduto, corProduto, tamanhoProduto, categoriaProduto, qtdeProduto) VALUES (@nomeProduto, @precoProduto, @corProduto, @tamanhoProduto, @categoriaProduto, @qtdeProduto)`;
            
            await pool.request()
            .input('nomeProduto', sql.VarChar(100), nomeProduto)
            .input('precoProduto', sql.Decimal(10,2), precoProduto)
            .input('corProduto', sql.VarChar(100), corProduto)
            .input('tamanhoProduto', sql.VarChar(1),tamanhoProduto)
            .input('categoriaProduto',sql.VarChar(50),categoriaProduto)
            .input('qtdeProduto',sql.int(),qtdeProduto)
            .query(querySQL);
        } catch (error) {
            
            console.error('Erro ao cadastrar produto', error)
            throw error;
            
        }
    }

}