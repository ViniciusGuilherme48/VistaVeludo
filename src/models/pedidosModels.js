const { sql, getConnection } = require("../config/db")

const pedidoModel = {
    
    criarPedido: async (nomeCliente, nomeProduto, categoriaProduto, qtdeProduto) => {
        try {
            const pool = await getConnection();

            let querySQL = `
            INSERT INTO Pedidos
            (
            nomeCliente,
            nomeProduto,
            categoriaProduto,
            qtdeProduto
            ) VALUES 
            (
            @nomeCliente,
            @nomeProduto,
            @categoriaProduto,
            @qtdeProduto
            )
            `

            await pool.request()
                .input('nomeCliente', sql.VarChar(100) ,nomeCliente)
                .input('nomeProduto', sql.VarChar(100) ,nomeProduto)
                .input('categoriaProduto', sql.VarChar(100) ,categoriaProduto)
                .input('qtdeProduto', sql.Int ,qtdeProduto)      
                .query(querySQL)      

            
        } catch (error) {
            console.error('Erro ao cadastrar produto', error)
            throw error
        }
    }
}

module.exports = {
    pedidoModel
}