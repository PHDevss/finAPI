# finAPI
 Este projeto foi desenvolvido junto com a Rocketseat. Ele é uma simples API de
um banco com as funcionalidades descritas abaixo.

## Itens de projeto
### Requisitos

- [x] Deve ser possível criar uma conta
- [x] Deve ser possível buscar o extrato bancário do cliente
- [x] Deve ser possível realizar um saque
- [x] Deve ser possível realizar um depósito
- [x] Deve ser possível buscar o extrato bancário do cliente por data
- [x] Deve ser possível atualizar os dados da conta do cliente
- [x] Deve ser possível obter dados da conta do cliente
- [x] Deve ser possível deletar uma conta

---

### Regras de negócio

- [x] Não deve ser possível cadastrar uma conta com o CPF já existente
- [x] Não deve ser possível fazer depósito em uma conta não existente
- [x] Não deve ser possível buscar extrato em uma conta não existente
- [x] Não deve ser possível fazer saque em uma conta não existente
- [x] Não deve ser possível excluir uma conta não existente
- [x] Não deve ser possível fazer saque quando o saldo for insuficiente
- [x] Deve ser possível retornar o balanço da account

## Tecnologias utilizadas
<ul>
<li>Typescript</li>
<li>Express</li>
<li>Prettier</li>
</ul>

## :heavy_check_mark: Documentação da API

### Cadastra usuário

```http
  POST /account
```

| Body Parâmetros   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | **Obrigatório**|
| `cpf` | `string` | **Obrigatório**|

#### Retorna o status code 201

### Realiza um depósito

```http
  POST /deposit
```

| Body Parâmetros   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `description` | `string` | **Opcional**|
| `amount` | `number` | **Obrigatório**|

| Header Parâmetros   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `cpf` | `string` | **Obrigatório**|


#### Retorna o status code 201

### Realiza um saque

```http
  POST /withdraw
```

| Body Parâmetros   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `description` | `string` | **Opcional**|
| `amount` | `number` | **Obrigatório**|

| Header Parâmetros   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `cpf` | `string` | **Obrigatório**|


#### Retorna o status code 201

### Solicita extrato completo do cliente

```http
  GET /statement
```

| Header Parâmetros   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `cpf` | `string` | **Obrigatório**|


#### Retorna extrato completo do cliente


### Solicita extrato na data informada

```http
  GET /statement/date
```

| Header Parâmetros   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `cpf` | `string` | **Obrigatório**|

| Query Parâmetros   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `date` | `string` | **Obrigatório** -> Exemplo formato: "2022-10-28"|

#### Retorna extrato na data informada

### Solicita informações da conta

```http
  GET /statement/date
```

| Header Parâmetros   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `cpf` | `string` | **Obrigatório**|

#### Retorna informações da conta

### Solicita balanço da conta

```http
  GET /statement/date
```

| Header Parâmetros   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `cpf` | `string` | **Obrigatório**|

#### Retorna balanço da conta

### Solicita exclusão da conta

```http
  DEL /account
```

| Header Parâmetros   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `cpf` | `string` | **Obrigatório**|

#### Retorna status 204

### Solicita alteração dos dados da conta

```http
  PUT /account
```

| Header Parâmetros   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `cpf` | `string` | **Obrigatório**|

| Body Parâmetros   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | **Obrigatório**|

#### Retorna status 201
## :file_folder: Instalando e rodando localmente

Clone o projeto

```Terminal
  git clone https://github.com/PHDevss/finAPI.git
```

Entre no diretório do projeto

```Terminal
  cd finAPI
```

Instale as dependências

```Terminal
  npm install
```

Inicie o servidor

```Terminal
  npm run start
```


## Status

🚧 <img src="http://img.shields.io/static/v1?label=STATUS&message=FINISHED&color=1&style=for-the-badge" /> 🚧
