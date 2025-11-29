const express = require("express");
require('dotenv').config();
const app = express();
const {produtoRoutes} = require("./src/routes/produtoRoute");
const {clienteRoutes} = require("./src/routes/clienteRoute");
const PORT = process.env.PORT;

app.use(express.json());

//Rotas de aplicação de produtos
app.use('/', produtoRoutes);

app.use('/', clienteRoutes);

app.listen(PORT, ()=>{
    console.log(`Servidor rodando em http//localhost:${PORT}`);

});