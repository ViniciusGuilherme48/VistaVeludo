## API Reference
### Produtos
#### GET /produtos
-**Descrição**: Obtém uma lista dos produtos
-**Parameters**: ?nomeProduto = "produtoExemplo" obtém um filtro de produtos buscando pelo nome do produto
-**Response**: Array de Produtos

#### POST /produtos
-**Descrição**: Cria um novo produto
-**Body**: 
````
{
    "nomeProduto": "produtoExemplo"
    "precoProduto": 0.00
}
````
-**Response**:
````
{
    "message": "Produto cadastrado com sucesso!"
}
````
#### PUT /produtos/:idProduto
-**Descrição**: Atualizar um produto já existente 
-**Body**:
````
{
    "nomeProduto": "nomeExemplo"
    "precoProduto": 0.00
}
````
-**Response**:
{
    "message": "Produto atualizado com sucesso!
}
#### DELETE /produtos/:idProduto
-**Descrição**: Deleta um produto ja cadastrado
-**Response**: 
{
    "message": "Produto deletado com sucesso!"
}

## API Reference
### Clientes
#### GET /clientes
-**Descrição**: Obtém uma lista dos clientes
-**Parameters**: ?nomeCliente = "nomeExemplo" obtém um filtro de clientes buscados pelo nome
-**Response**: Array de Clientes


#### POST /clientes
-**Descrição**: Cadastra um novo cliente
-**Body**:
````
{
    "nomeCliente": "clienteExemplo"
    "cpfCliente": "cpfExemplo"
    "emailCliente": "emailExemplo"
    "telefoneCliente": "telefoneExemplo"
}
````
-**Response**:
````
{
    "message:": "Cliente cadastrado com Sucesso!"
}
````
#### PUT /clientes/:idCliente
-**Descrição**: Atualizar um cliente ja exiteste
-**Body**:
````
{
    "nomeCliente": "nomeExemplo"
    "cpfCliente": "cpfExemplo"
    "emailCliente": "emailExemplo"
    "telefoneCliente": "telefoneExemplo"
}
````
#### DELETE /clientes/:idCliente
-**Descrição**: Excliu um cliente cadastrado!