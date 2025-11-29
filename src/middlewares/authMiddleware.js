const jwt = require("jsonwebtoken");

const verify = {
    cliente: async (req, res, next) => {

        try {
            const { token } = req.cookies;
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            if (!decoded.tipoUsuario || decoded.tipoUsuario !== "cliente") {
                return res.status(403).json({ erro: "acesso permitido apenas para clientes" })
            };

            req.cliente = {
                idCliente: decoded.idCliente,
                nomeCliente: decoded.nomeCliente
            };

            next();
        } catch (error) {
            return res.status(401).json({ erro: "token invalido" })

        }
    }
};

module.exports = { verify };