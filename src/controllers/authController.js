const { clienteModel } = require("../models/clienteModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = {
    clienteLogin: async (req, res) => {

        try {

            const { emailCliente, senhaCliente } = req.body;

            if (emailCliente == undefined || senhaCliente == undefined) {
                return res.status(400).json({ erro: "email e senha obrigatórios}" });
            }

            const result = await clienteModel.buscarEmail(emailCliente);

            if (!result || !result.recordset || result.recordset.length === 0) {
                return res.status(401).json({ erro: "Email não encontrado" });
            }

            const senhaValida = await bcrypt.compare(senhaCliente, clienteModel.senhaCliente);

            if (!senhaValida) {
                return res.status(401).json({ erro: "Credenciais inválidas" });
            }

            const payload = {
                idCliente: clienteModel.idCliente,
                nomeCliente: clienteModel.nomeCliente,
                tipoUsuario: "Cliente"
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_SECRET_IN
            });

            res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "strict",
                maxAge: Number(process.env.JWT_TIME_EXPIRES_IN)
            });

            res.status(200).json({ message: "Logado com sucesso", token });

        } catch (error) {

            console.error('Erro no login de cliente: ', error);
            return res.status(500).json({ erro: "Erro no servidor ao realizar login do cliente" })
        }
    }
};

module.exports = { authController };