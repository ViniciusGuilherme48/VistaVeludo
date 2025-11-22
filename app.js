const express = require("express");
require('dotenv').config();
const app = express();
const {produtoRoute} = require("./src/routes/produtoRoute");
const {clienteRoute} = require("./src/routes/clienteRoute");
const PORT = process.env.PORT;

app.use(express.json());

//Rotas de aplicação de produtos
app.use('/', produtoRoute);

app.use('/', clienteRoute);
app.listen(PORT, ()=>{
    console.log(`Servidor rodando em http//localhost:${PORT}`);

});