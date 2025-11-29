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
    cadastrarCliente: async (req, res) => {

        try {
            const { nomeCliente, cpfCliente, emailCliente, telefoneCliente, senhaCliente } = req.body;

            if (nomeCliente == undefined || cpfCliente == undefined || emailCliente == undefined || senhaCliente == isNaN) {
                return res.status(400).json({
                    erro: 'Campos obrigatorios não preenchidos'
                });
            }
            //criptografia da senha
            const saltRounds = 10;

            const senhaCriptografada = await bcrypt.hash(senhaCliente, saltRounds);

            //verificar CPF existente
            const clientes = await clienteModel.buscarCpf(cpfCliente);

            if (clientes.length > 0) {
                return res.status(409).json({ erro: 'CPF já cadastrado' });
            }

            await clienteModel.cadastrarCliente(nomeCliente, cpfCliente, emailCliente, telefoneCliente, senhaCriptografada);

            res.status(201).json({
                message: 'cliente cadastrado com sucesso'
            })
        } catch (error) {

            console.error('erro ao cadastrar cliente', error);

            res.status(500).json({
                error: 'Erro ao cadastrar cliente'
            })
        }
    },
    atualizarCliente: async (req, res)=>{
        try {
            const {idCliente}= req.params;
            const {nomeCliente, emailCliente, telefoneCliente, senhaCliente}=req.body;

            if(idCliente.length != 36){
                return res.status(400).json({erro: 'id do produto invalido!'});

            }
            const cliente = await clienteModel.buscarUm(idCliente);

            if(!cliente || cliente.length !==1){
                return res.status(404).json({error: 'Cliente não encontrado'});
              
            }
            const clienteAtual = cliente[0];
            const nomeAtualizado = nomeCliente ?? clienteAtual.nomeCliente;
            //faz a vereificação se ja existe
            const emailAtualizado = emailCliente ?? clienteAtual.emailCliente;

            const telefoneAtualizado = telefoneCliente ?? clienteAtual.telefoneCliente;

            const senhaAtualizada = senhaCliente ?? clienteAtual.senhaCliente;

            await clienteModel.atualizarCliente(idCliente, nomeAtualizado, telefoneAtualizado, emailAtualizado);
            res.status(200).json({message: 'Cliente atualizado!'});


        } catch (error) {
            console.error('Erro ao atualizar cliente', error);
            res.status(500).json({ erro: 'Erro interno no servidor ao atualizar cliente!' });
        }
    },
    deletarCliente: async (req, res)=>{
        try {
            const {idCliente}= req.params;
            if (idCliente.length != 36){
                return res.status(400).json({error: 'Cliente não encontrado'});
            }

            const cliente = await clienteModel.buscarUm(idCliente);

            if(!cliente || cliente.length !==1){
                return res.status(404).json({error: 'Cliente não encontrado'});
            }
            await clienteModel.deletarCliente(idCliente);
            res.status(200).json({message: 'Cliente deletado com sucesso!'});
            
        }catch(error){
            console.error('Erro ao deletar cliente', error);
            res.status(500).json({erro: 'Erro interno no servidor ao deletar cliente.'});
        }
    }
};

module.exports = { clienteController }