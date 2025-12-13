## API Reference
### Produtos
#### GET /produtos
- **Descrição**: Obtém uma lista dos produtos
- **Parameters**: ?nomeProduto = "produtoExemplo" obtém um filtro de produtos buscando pelo nome do produto
- **Response**: Array de Produtos

#### POST /produtos
- **Descrição**: Cria um novo produto
- **Body**: 
```
{
    "nomeProduto": "produtoExemplo"
    "precoProduto": 0.00
    "corProduto": "corExemplo"
    "tamanhoProduto": "tamanhoExemplo"
    "categoria": "categoriaExemplo"
    "qtdeProduto": "qtdeExemplo"
}
```
- **Response**:
```
{
    "message": "Produto cadastrado com sucesso!"
}
```
#### PUT /produtos/:idProduto
- **Descrição**: Atualizar um produto já existente 
- **Body**:
```
{
    "nomeProduto": "nomeExemplo"
    "precoProduto": 0.00
    "corProduto": "corExemplo"
    "tamanhoProduto": "tamanhoExemplo"
    "categoria": "categoriaExemplo"
    "qtdeProduto": "qtdeExemplo"
}
```
- **Response**:
{
    "message": "Produto atualizado com sucesso!
}
#### DELETE /produtos/:idProduto
- **Descrição**: Deleta um produto ja cadastrado
- **Response**: 
{
    "message": "Produto deletado com sucesso!"
}

### Clientes
#### GET /clientes
- **Descrição**: Obtém uma lista dos clientes
- **Parameters**: ?nomeCliente = "nomeExemplo" obtém um filtro de clientes buscados pelo nome
- **Response**: Array de Clientes


#### POST /clientes
- **Descrição**: Cadastra um novo cliente
- **Body**:
```
{
    "nomeCliente": "clienteExemplo"
    "cpfCliente": "cpfExemplo"
    "emailCliente": "emailExemplo"
    "telefoneCliente": "telefoneExemplo"
    "senhaCliente": "senhaEexemplo"
}
```
- **Response**:
```
{
    "message:": "Cliente cadastrado com Sucesso!"
}
```
#### PUT /clientes/:idCliente
- **Descrição**: Atualizar um cliente ja exiteste
- **Body**:
```
{
    "nomeCliente": "nomeExemplo"
    "cpfCliente": "cpfExemplo"
    "emailCliente": "emailExemplo"
    "telefoneCliente": "telefoneExemplo"
     "senhaCliente": "senhaEexemplo"
}
```
#### DELETE /clientes/:idCliente
- **Descrição**: Exclui um cliente cadastrado!

- **Response**:
```
{
    "message:": "Cliente deletado com Sucesso!"
}
```
### PEDIDOS
#### POST /pedidos
- **Descriçao**: Cria um novo pedido

- **Body**:
```
{
  "idCliente": "GUID_DO_CLIENTE",
  "itens": [
    {
      "idProduto": "GUID_DO_PRODUTO"
    },
    {
      "idProduto": "OUTRO_GUID_PRODUTO"
    }
  ]
}

```

- **Response**:
```
{
    "message": "Pedido cadastrado com sucesso"
}
```

### ITEM
#### GET /pedidos
- **Descriçao**: Lista todos os pedidos 

- **Response**: Arrey de pedidos


### ITEM
#### POST /item
- **Descriçao**: Cria um novo item

- **Body**:
```
{
  "idPedido": "GUID_DO_PEDIDO",
  "idProduto": "GUID_DO_PRODUTO"
}

```

- **Response**:
```
{
    "message": "item cadastrado com sucesso"
}
```
