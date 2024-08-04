
# API CRUD básico

- Esse projeto é uma api que permite realizar um CRUD de produtos e categorias.   
- Não se esqueça de criar um .env com a string de conexão de nome MONGO_CONNECT
- Codigo está na Branch master
- Para executar localmente a aplicação execute o comando npm start


## Tecnologia
- Typescript
- Mongoose
- Express

## Documentação da API

### Categorias
#### Retorna todas as categorias

```http
  GET /api/category
```

### Categorias
#### Retorna todas as categorias com paginação

```http
  GET /api/category/:page&:limit
```

#### Retorna uma categoria

```http
  GET /api/category/:id
```



#### Cadastrar categoria

```http
  POST /api/category 
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name` | `String` |  **Obrigatorio**. Nome da categoria | 


#### Deletar Categoria

```http
  DELETE /api/category/:id
```

#### Atualizar categoria

```http
  PUT /api/category/:id 
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name` | `String` |  **Obrigatorio**. Nome da categoria | 


### Produtos
#### Retorna todas as produtos

```http
  GET /api/product
```

 
#### Retorna todas as produtos com paginação

```http
  GET /api/product/:page&:limit
```

#### Retorna um produto

```http
  GET /api/product/:id
```



#### Cadastrar produto

```http
  POST /api/product 
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name` | `String` |  **Obrigatorio**. Nome do produto | 
| `price` | `Number` |  **Obrigatorio**. Preço do produto | 
| `description` | `String` |  Descrição do produto | 
| `category` | `Category` |  **Obrigatorio**. Nome da categoria | 

#### Deletar produto

```http
  DELETE /api/product/:id
```

#### Atualizar produto

```http
  PUT /api/product/:id 
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name` | `String` |  **Obrigatorio**. Nome do produto | 
| `price` | `Number` |  **Obrigatorio**. Preço do produto | 
| `description` | `String` |  Descrição do produto | 
| `category` | `Category` |  **Obrigatorio**. Nome da categoria | 
