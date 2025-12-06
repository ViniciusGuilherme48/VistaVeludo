const { sql, getConnection } = require("../config/db")

const pedidoModel = {
    criarPedido: async (idCliente) => {
        try {
            const pool = await getConnection();

            const querySQL = `
                INSERT INTO Pedidos (idCliente)
                OUTPUT INSERTED.idPedido
                VALUES (@idCliente)
            `;

            const result = await pool.request()
                .input("idCliente", sql.UniqueIdentifier, idCliente)
                .query(querySQL);

            // Retornar o GUID gerado
            return result.recordset[0].idPedido;

        } catch (error) {
            console.error("Erro ao criar pedido:", error);
            throw error;
        }
    },

    listarPedidos: async () => {
        try {
            const pool = await getConnection()

            let querySQL = "SELECT * FROM Pedidos"

            const result = await pool.request().query(querySQL)

            return result.recordset
        } catch (error) {
            console.error("Erro ao buscar produtos", error)
            throw error
        }
    }
}
module.exports = {
        pedidoModel
    }