const { sql, getConnection } = require("../config/db");

const clienteModel = {

    //Buscar todos clientes no banco de dados
    buscarTodos: async () => {
        try {

            const pool = await getConnection();

            let querySQL = "SELECT * FROM Clientes";

            const result = await pool.request().query(querySQL);

            return result.recordset;

        } catch (error) {

            console.error('Erro ao buscar Clientes:', error);
            throw error;

        }

    },
    buscarUm: async (idCliente) => {
        try {
            const pool = await getConnection();
            const querySQL = 'SELECT *FROM Cliente WHERE idCliente =@idCliente';

            const result = await pool.request()
                .input('idCliente', sql.UniqueIdentifier, idCliente)
                .query(querySQL);
            return result.recordset;

        } catch (error) {
            console.error('Erro ao buscar o cliente', error);
            throw error;

        }
    },

    //Buscar um cliente por CPF
    buscarCpf: async (cpfCliente) => {

        try {
            const pool = await getConnection();

            let querySQL = `SELECT * FROM clientes WHERE cpfCliente = @cpfCliente `;

            const result = await pool.request()
                .input('cpfCliente', sql.VarChar(15), cpfCliente)
                .query(querySQL);

            return result.recordset;

        } catch (error) {
            console.error('Erro ao verificar o CPF', error);
            throw error;
        }
    },

    //buscar cliente por email
    buscarEmail: async (emailCliente) => {

        try {
            const pool = await getConnection();

            let querySQL = `SELECT * FROM cliente WHERE emailCliente = @emailCliente`;

            const result = await pool.request()
                .input('emailCliente', sql.VarChar(200), emailCliente)
                .query(querySQL);

            return result.recordset;

        } catch (error) {

            console.error('Erro ao verificar o email', error);
            throw error;

        }
    },

    // Cadastrar clientes no banco de dados
    cadastrarCliente: async (nomeCliente, cpfCliente, emailCliente, telefoneCliente, senhaCliente) => {
        try {

            const pool = await getConnection();

            let querySQL = 'INSERT INTO clientes (nomeCliente, cpfCliente, emailCliente, telefoneCliente, senhaCliente) VALUES (@nomeCliente, @cpfCliente, @emailCliente, @telefoneCliente, @senhaCliente)';
            await pool.request()
                .input('nomeCliente', sql.VarChar(100), nomeCliente)
                .input('cpfCliente', sql.VarChar(15), cpfCliente)
                .input('emailCliente', sql.VarChar(200), emailCliente)
                .input('telefoneCliente', sql.VarChar(20), telefoneCliente)
                .input('senhaCliente', sql.VarChar(255), senhaCliente)
                .query(querySQL);

        } catch (error) {

            console.error('Erro ao cadastrar cliente', error);

            throw error;

        }

    },
    atualizarCliente: async (idCliente, nomeCliente, emailCliente, telefoneCliente, senhaCliente) => {
        try {
            const pool = await getConnection();

            const querySQL = `
            UPDATE Clientes
            SET nomeCliente =@nomeCliente,
            emailCliente =@emailCliente,
            telefoneCliente =@telefoneCliente,
            WHERE idCliente =@idCliente
            `
            await pool.request()
                .input('nomeCliente', sql.VarChar(100), nomeCliente)
                .input('emailCliente', sql.VarChar(200), emailCliente)
                .inout('telefoneCliente', sql.VarChar(20), telefoneCliente)
                .query(querySQL);
        } catch (error) {
            console.error('Erro ao atualizar cliente:', error);
            throw error;
        }
    },
    deletarCliente: async (idCliente) => {
        try {
            const pool = await getConnection();
            const querySQL = `
            DELETE FROM Clientes
            WHERE idCliente =@idCliente
            `
            await pool.request()
                .input("idCliente", sql.UniqueIdentifier, idCliente)
                .query(querySQL);

        } catch (error) {
            console.error('Erro ao deletar cliente:', error);
            throw error;
        }
    }

}

module.exports = { clienteModel };