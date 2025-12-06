const { sql, getConnection } = require("../config/db")

const itemModel = {
    criarItem: async (idPedido, idProduto) => {
        try {
            const pool = await getConnection()

            const querySQL = `
                INSERT INTO Itens (idPedido, idProduto )
        VALUES (@idPedido, @idProduto)
            `

            await pool.request()
                .input("idPedido", sql.UniqueIdentifier, idPedido)
                .input("idProduto", sql.UniqueIdentifier, idProduto)
                .query(querySQL)

        } catch (error) {
            console.error('Erro ao cadastrar item')
            throw error
        }
    }
}

module.exports = {
    itemModel
}