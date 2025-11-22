const { clienteModel } = require("../models/clienteModel");
const bcrypt = require('bcrypt');

const clienteController = {

    // Lista de clientes cadastrados
    listarCliente: async (req, res) => {
        try {
            const clientes = await clienteModel.buscarTodos();

            res.status(200).json(clientes);

        } catch (error) {

            console.error('Erro ao listar clientes:', error);
            res.status(500).json({
                error: "Erro ao buscar clientes"
            });
        }
    },

    //Cadastrar clientes no banco de dados
    CadastrarCliente: async (req, res) => {

        try {
            const { nomeCliente, cpfCliente, emailCliente, senhaCliente } = req.body;

            if (nomeCliente == undefined || cpfCliente == undefined || emailCliente == undefined || senhaCliente == isNaN) {
                return res.status(400).json({
                    erro: 'Campos obrigatorios não preenchidos'
                });
            }
            //criptografia da senha
            const saltRounds = 10;

            const senhaCriptografada = await bcrypt.hash(senhaCliente, saltRounds);

            //verificar CPF existente
            const clientes = await clienteModel.BuscarCpf(cpfCliente);

            if (clientes.length > 0) {
                return res.status(409).json({ erro: 'CPF já cadastrado' });
            }

            await clienteModel.CadastrarCliente(nomeCliente, cpfCliente, emailCliente, senhaCriptografada);

            res.status(201).json({
                message: 'cliente cadastrado com sucesso'
            })
        } catch (error) {

            console.error('erro ao cadastrar cliente', error);

            res.status(500).json({
                error: 'Erro ao cadastrar cliente'
            })
        }
    }
}
module.exports = { clienteController }