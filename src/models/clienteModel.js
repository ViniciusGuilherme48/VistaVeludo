const { VarChar } = require("mssql");
const { sql, getConnetion } = require("../config/db");

const clienteModel = {

    //Buscar todos clientes no banco de dados
    buscarTodos: async () => {
        try {

            const pool = await getConnetion();

            let querySQL = "SELECT * FROM clientes";

            const result = await pool.request().query(querySQL);

            return result.recordset;

        } catch (error) {

            console.error('Erro ao buscar Clientes:', error);

            throw error;

        }

    },
    
    //Buscar um cliente por CPF
    BuscarCpf: async () => {
        
        try {
            const pool = await getConnetion();

            let querySQL =`SELECT * FROM cliente WHERE cpfCliente = @cpfCliente `;

            const result = await pool.request()
            .input('cpfCliente', sql.VarChar(15), cpfCliente)
            .query(querySQL);

        } catch (error) {
            console.error('Erro ao verificar o CPF', error);
            throw error;
        }
    },

    //buscar cliente por email
    buscarEmail: async (emailCliente) => {
        
        try {
            const pool = await getConnetion();

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
    CadastrarCliente: async (nomeCliente, cpfCliente, emailCliente, telefoneCliente, senhaCliente) => {
        try {

            const pool = await getConnetion();

            let querySQL = 'INSERT INTO clientes (nomeCliente, cpfCliente, emailCliente, telefoneCliente, senhaCliente) VALUES (@nomeCliente, @cpfCliente, @emailCliente, @telefoneCliente, @senhaCliente)';
            await pool.request()
            .input('nomeCliente', sql.VarChar(100),nomeCliente)
            .input('cpfCliente', sql.VarChar(15), cpfCliente)
            .input('emailCliente', sql.VarChar(200), emailCliente)
            .inout('telefoneCliente', sql.VarChar(20), telefoneCliente)
            .input('senhaCliente', sql.VarChar(255), senhaCliente)
            .query(querySQL);

        } catch (error) {

            console.error('Erro ao cadastrar cliente', error);

            throw error;

        }

    }

}

module.exports = {clienteModel};