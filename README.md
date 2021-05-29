<h1 align="center">
  <img alt="Happy" src="./.github/logo.svg" height="88px" />
</h1>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/AlexBorgesDev/happy-api" />
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/AlexBorgesDev/happy-api" />
  <img alt="GitHub" src="https://img.shields.io/github/license/AlexBorgesDev/happy-api" />
</p>

# Happy - API

Happy é uma rede social focada nos famosos *memes*, com o intuito de ser uma lugar divertido e alegre. Aqui você alem de ver os *memes* produzidos por outros, você pode compartilhar os seus próprios, tornando a comunidade cada vez maior e mais alegre.

## Sumário

- [Happy - API](#happy---api)
  - [Sumário](#sumário)
  - [Introdução](#introdução)
  - [Pré-Requisitos](#pré-requisitos)
  - [Preparando o Ambiente](#preparando-o-ambiente)
    - [Ambiente de Testes](#ambiente-de-testes)
    - [Ambiente de Desenvolvimento](#ambiente-de-desenvolvimento)
  - [Rodando a API](#rodando-a-api)
    - [Docker](#docker)
    - [Localhost](#localhost)
  - [Referências da API](#referências-da-api)
    - [Seções](#seções)
      - [Criar uma nova seção](#criar-uma-nova-seção)
    - [Usuários](#usuários)
      - [Obter informações de um usuário](#obter-informações-de-um-usuário)
      - [Criar um novo usuário](#criar-um-novo-usuário)
      - [Alterando informações de um usuário](#alterando-informações-de-um-usuário)
      - [Deletando um usuário](#deletando-um-usuário)
    - [Posts](#posts)
      - [Obter um post](#obter-um-post)
      - [Obter posts](#obter-posts)
      - [Criar um novo post](#criar-um-novo-post)

## Introdução

Está documentação apresenta todas as coisas que você pode acessar e fazer com a API da rede social Happy. desde obter, criar alterar e deletar informações.

A API foi feita em Node.js usando as libs Express.js + Typescript e outras. Utiliza o Postgres como banco de dados, usando a lib Prisma ORM para fazer as requisições SQL. A API aceita requisições **Multiform-Data** e **JSON** dos tipos:

- **GET** - Obter informações
- **POST** - Criação/Inserção de novas informações
- **PUT** - Edição/Alteração de informações
- **DELETE** - Deletar informações temporária ou permanentemente

Todas as requisições terão retornos do tipo **JSON**.

> :warning: Sempre dê prioridade a requisições do tipo JSON, usando o tipo Multiform-Data apenas em casos onde o upload de arquivos seja necessário.

## Pré-Requisitos

Para poder configurar o ambiente para utilizar a API, antes, verifique se você já possui o que é necessário instalado em sua máquina.

> Caso tenha o Docker & Docker Compose instalados, os aplicativos abaixo não serão mais necessários, podendo ignorar os memos e seguir para as seções seguintes.

1. Node.js - v14.17.0 ou superior
2. Postgres - v13.3 ou superior
3. PgAdmin 4 - v5.3 ou superior (Opcional)

## Preparando o Ambiente

Para começar a utilizar a API Happy alguns procedimentos devem ser feitos para cada tipo de uso: **testes** ou **desenvolvimento**.

### Ambiente de Testes

Caso deseje utiliza a API apenas para testes, ou seja, não deseja alterar seu código-fonte, basta seguir os procedimentos abaixo:

1. Baixe o código já compilado através deste *link*.
2. Extraia o arquivo com o código em seu local de desejo e acesse o mesmo.
3. Caso for utilizar o **Docker,** pule as etapas seguintes e vá direto para a seção [*Rodando a API*](#rodando-a-api).
4. Altere o arquivo .env, adicionando suas próprias configurações.
5. Tudo pronto, agora é só seguir os passos da etapa *Rodando a API*.

### Ambiente de Desenvolvimento

## Rodando a API

### Docker

### Localhost

## Referências da API

Todas as rotas e suas funções poderão ser encontradas a partir dá aqui.

### Seções

Responsável por criar e armazenar as seções e, também, gerar tokens de seções para os usuários.

#### Criar uma nova seção

Para criar uma nova seção, uma requisição **`POST`** deve ser feita para **`/sections`**.

**Recebe:**

```typescript
{
  email: {
    type: "string",
    required: true,
  },

  password: {
    min: 8,
    max: 16,
    type: "string",
    required: true
  }
}
```

**Retorna - `Status 201`**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTYyMTg5NDA1NSwiZXhwIjoxNjMyOTUzMjU1fQ.G7i2yheOxulCmGyMDHzlbVOl84K4ChmogFUcFllPkoo"
}
```

---

### Usuários

Responsável por gerenciar as contas dos usuários. Tendo as funcionalidades de obter, criar, alterar e deletar o(s) usuário(s).

#### Obter informações de um usuário

Uma requisição **`GET`** deve ser feita para **`/users`** passando o token da seção no **Header** da requisição, através do campo *Authorization*, tendo o seguinte formato: `Bearer <token>`.

**Retorna - `Status 200`**

```json
{
  "name": "Alex Borges Ramos",
  "email": "email@email.com",
  "image": "minhaFotoDePerfil.png"
}
```

#### Criar um novo usuário

Para criar um novo usuário, uma requisição **`POST`** deve ser feita para **`/users`**.

**Recebe:**

```typescript
{
  name: {
    min: 2,
    type: "string",
    fullName: true,
    required: true
  },

  email: {
    type: "string",
    required: true
  },

  password: {
    min: 8,
    max: 16,
    type: "string",
    required: true
  }
}
```

> :information_source: Uma requisição ***Multiform-Data*** pode ser feita para passar uma imagem, informando-a no campo **image**.

**Retorna - `Status 201`**

```json
{
  "message": "User created successfully"
}
```

#### Alterando informações de um usuário

Para alterar informações de um usuário, uma requisição **`PUT`** deve ser feita para **`/users`** passando o token da seção no **Header** da requisição, através do campo *Authorization*, tendo o seguinte formato: `Bearer <token>`.

**Recebe:**

```typescript
{
  name: {
    min: 2,
    type: "string",
    fullName: true,
    required: false
  },

  email: {
    type: "string",
    required: false
  }
}
```

> :information_source: Uma requisição ***Multiform-Data*** pode ser feita para passar uma imagem, informando-a no campo **image**.

**Retorna - `Status 200`**

```json
{
  "message": "User updated successfully",
  "data": {
    "name": "Alex Borges Ramos",
    "email": "novoEmail@email",
    "image": "novaImagem.jpeg"
  }
}
```

#### Deletando um usuário

Para deletar um usuário, uma requisição **`DELETE`** deve ser feita para **`/users`** passando o token da seção no **Header** da requisição, através do campo *Authorization*, tendo o seguinte formato: `Bearer <token>`, a senha do usuário também deve ser informada no **Header** da requisição através do campo *password*.

**Retorna - `Status 200`**

```json
{
  "message": "User deleted successfully",
  "info": "It may take up to 2 days for everything to be erased"
}
```

---

### Posts

Responsável por gerenciar os posts dos usuários. Tendo as funcionalidades de obter, criar, alterar e deletar o(s) posts(s).

#### Obter um post

Para obter um post, uma requisição **`GET`** deve ser feita para **`/posts/:slug`**. O *slug* é, assim como o id, um identificador único de cada post. Exemplo: `/posts/1621894076434-7328083f0948441d`.

> :information_source: Esta requisição pode ser feita com ou sem o token de seção.

**Retorna - `Status 200`**

```json
{
  "id": 1,
  "slug": "1621894076434-7328083f0948441d",
  "title": "Post Title",
  "liked": false,
  "saved": false,
  "content": "1621894076389-Firs-Post.png",
  "createAt": "2021-05-24T22:07:56.510Z",
  "updateAt": "2021-05-24T22:07:56.511Z",
  "author": {
    "name": "Alex Borges Ramos",
    "image": "minhaFotoDePerfil.png"
  }
}
```

> :information_source: Para ter informações se o usuário curtiu ou salvou o post, o token da seção deve ser informado no **Header** da requisição, através do campo ***Authorization***, tendo o formato: `Bearer <token>`.

#### Obter posts

Para obter os posts, uma requisição **`GET`** deve ser feita para **`/posts`**.

> :information_source: Esta requisição pode ser feita com ou sem o token de seção.

**Recebe as Queries:**

Exemplo de query: `/posts?page=1`

```typescript
{
  page: {
    type: "number",
    integer: true,
    required: false
  },

  maxDate: {
    type: "number" | "Date", // Caso utilize javascript, o valor passado poderá ser o valor obtido da função Date.now()
    required: true,
    description: "So retornaram os posts que foram postados antes da data informada, garantindo assim que os posts não se repitam ao alterar a pagina."
  }
}
```

> :information_source: Para ter informações se o usuário curtiu ou salvou o post, o token da seção deve ser informado no **Header** da requisição, através do campo ***Authorization***, tendo o formato: `Bearer <token>`.

**Retorna - `Status 200`**

```json
{
  "page": 1,
  "take": 20,
  "data": [
    {
      "id": 1,
      "slug": "1621894076434-7328083f0948441d",
      "title": "Post Title",
      "liked": false,
      "saved": false,
      "content": "1621894076389-Firs-Post.png",
      "createAt": "2021-05-24T22:07:56.510Z",
      "updateAt": "2021-05-24T22:07:56.511Z",
      "author": {
        "name": "Alex Borges Ramos",
        "image": "minhaFotoDePerfil.png"
      }
    }
  ],
  "total": 1
}
```

#### Criar um novo post

Para criar um novo post, uma requisição **`POST`** deve ser feita para **`/posts`**.

**Recebe:**

> :warning: A requisição obrigatoriamente tem que ser **Multiform-Data**, pois uma imagem deve ser enviada através do campo **content.**

```typescript
{
  title: {
    min: 2,
    type: "string",
    required: true
  }
}
```

**Retorna - `Status 201`**

```json
{
  "message": "Post created successfully"
}
```
