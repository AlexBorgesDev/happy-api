<h1 align="center">
  <img alt="Happy" src="./.github/logo.svg" height="112px" />
</h1>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/AlexBorgesDev/happy-api" />
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/AlexBorgesDev/happy-api" />
  <img alt="GitHub" src="https://img.shields.io/github/license/AlexBorgesDev/happy-api" />
</p>

# Happy - API

Happy é uma rede social focada nos famosos *memes*, com o intuito de ser uma lugar divertido e alegre. Aqui você alem de ver os *memes* produzidos por outros, você pode compartilhar os seus próprios, tornando a comunidade cada vez maior e mais alegre.

## Sumário

- [Sumário](#sumário)
- [Introdução](#introdução)
- [Pré-Requisitos](#pré-requisitos)
- [Preparando o Ambiente e Executando a API](#preparando-o-ambiente-e-executando-a-api)
  - [Ambiente de Desenvolvimento](#ambiente-de-desenvolvimento)
- [Referências da API](#referências-da-api)
  - [Sessões](#sessões)
    - [Criar uma nova sessão](#criar-uma-nova-sessão)
  - [Usuários](#usuários)
    - [Obter informações de um usuário](#obter-informações-de-um-usuário)
    - [Obter posts feito por um usuário](#obter-posts-feito-por-um-usuário)
    - [Criar um novo usuário](#criar-um-novo-usuário)
    - [Alterando informações de um usuário](#alterando-informações-de-um-usuário)
    - [Deletando um usuário](#deletando-um-usuário)
  - [Posts](#posts)
    - [Obter um post](#obter-um-post)
    - [Obter posts](#obter-posts)
    - [Criar um novo post](#criar-um-novo-post)
    - [Deletar um post](#deletar-um-post)
  - [Comentários](#comentários)
    - [Obter comentários](#obter-comentários)
    - [Criar um comentário](#criar-um-comentário)
    - [Deletar um comentário](#deletar-um-comentário)
  - [Reações](#reações)
    - [Criar uma reação](#criar-uma-reação)
    - [Deletando uma reação](#deletando-uma-reação)
  - [Posts Salvos](#posts-salvos)
    - [Obter posts salvos pelo usuário](#obter-posts-salvos-pelo-usuário)
    - [Salvar um post](#salvar-um-post)
    - [Remover um post da lista de posts salvos](#remover-um-post-da-lista-de-posts-salvos)

## Introdução

Está documentação apresenta todas as coisas que você pode acessar e fazer com a API da rede social Happy. desde obter, criar, alterar e deletar informações.

A API foi feita em Node.js usando as libs Express.js + Typescript e outras. Utiliza o Postgres como banco de dados, usando a lib Prisma ORM para fazer as requisições SQL. A API aceita requisições **Multiform-Data** e **JSON** dos tipos:

- **GET** - Obter informações
- **POST** - Criação/Inserção de novas informações
- **PUT** - Edição/Alteração de informações
- **DELETE** - Deletar informações temporária ou permanentemente

Todas as requisições terão retornos do tipo **JSON**.

> :warning: Sempre dê prioridade a requisições do tipo JSON, usando o tipo Multiform-Data apenas em casos onde o upload de arquivos seja necessário.

## Pré-Requisitos

Para poder configurar o ambiente para utilizar a API, antes, verifique se você já possui o que é necessário instalado em sua máquina.

1. [Node.js](https://nodejs.org/) - v14.17.0 ou superior
2. [Postgres](https://www.postgresql.org/) - v13.3 ou superior
3. [PgAdmin 4](https://www.pgadmin.org/) - v5.3 ou superior (Opcional)

## Preparando o Ambiente e Executando a API

Para começar a utilizar a API Happy alguns procedimentos devem ser feitos.

### Ambiente de Desenvolvimento

1. Clone o repositório com o comando: `git clone https://github.com/AlexBorgesDev/happy-api.git`
2. Crie um arquivo .env na raiz do projeto e o altere, adicionando suas propiás configurações de acordo com o arquivo [.exemple.env](./.exemple.env).
3. Instale as dependências com o comando: `yarn` ou `npm install`.
4. Adicione as tabelas no banco de dados com o comando: `yarn init-dev-db` ou `npm run init-dev-db`.
5. Execute a API executando o comando: `yarn dev` ou `npm run dev`.

> :information_source: O arquivo [Makefile](./Makefile) contem alguns comandos docker, que podem ser executados usando o comando: `make <commando>`. O comando *`make`* é encontrado apenas nos sistemas **Linux** e **macOS**.

## Referências da API

Todas as rotas e suas funções poderão ser encontradas a partir dá aqui.

> :warning: Para obter arquivos que foram upados para o servidor, basta fazer uma requisição para a raiz `/` informando o nome do arquivo, exemplo: `/nomeDoArquivo.png`.

### Sessões

Responsável por criar e armazenar as sessões e, também, gerar tokens de sessões para os usuários.

#### Criar uma nova sessão

Para criar uma nova sessão, uma requisição **`POST`** deve ser feita para **`/sessions`**.

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
  "data": {
    "name": "Alex Borges Ramos",
    "email": "email@email.com",
    "password": "defaultImage.png"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTYyMTg5NDA1NSwiZXhwIjoxNjMyOTUzMjU1fQ.G7i2yheOxulCmGyMDHzlbVOl84K4ChmogFUcFllPkoo"
}
```

---

### Usuários

Responsável por gerenciar as contas dos usuários. Tendo as funcionalidades de obter, criar, alterar e deletar o(s) usuário(s).

#### Obter informações de um usuário

Uma requisição **`GET`** deve ser feita para **`/users`**, passando o token da seção no **Header** da requisição, através do campo *Authorization*, tendo o seguinte formato: `Bearer <token>`.

**Retorna - `Status 200`**

```json
{
  "name": "Alex Borges Ramos",
  "email": "email@email.com",
  "image": "minhaFotoDePerfil.png"
}
```

#### Obter posts feito por um usuário

Para obter os posts feitos por um usuário, uma requisição **`GET`** deve ser feita para **`/users/posts`**, passando o token da seção no **Header** da requisição, através do campo *Authorization*, tendo o seguinte formato: `Bearer <token>`.

**Recebe as Queries:**

Exemplo de query: `/users?page=1`

```typescript
{
  page: {
    type: "number",
    integer: true,
    required: false
  }
}
```

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
  "total": 1,
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

Responsável por gerenciar os posts dos usuários. Tendo as funcionalidades de obter, criar e deletar o(s) posts(s).

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

#### Deletar um post

Para deletar um novo post, uma requisição **`DELETE`** deve ser feita para **`/posts/:postId`**, passando o id do post como parâmetro na url, exemplo: `/posts/1`. O token da seção também deve ser informado no **Header** da requisição, através do campo *Authorization*, tendo o seguinte formato: `Bearer <token>`.

**Retorna - `Status 201`**

```json
{
  "message": "Post deleted successfully"
}
```

---

### Comentários

Responsável por gerenciar os comentários dos usuários nos posts. Tendo as funcionalidades de obter, criar, alterar e deletar o(s) comentário(s).

#### Obter comentários

Para obter os comentários de um post, uma requisição **`GET`** deve ser feita para **`/comments/:postId`**, exemplo: `/comments/1`. Os comentários filhos de outros comentários podem ser obtidos através da url **`/comments/:postId/:fatherId`**, exemplo: `/comments/1/1`.

**Recebe as Queries:**

Exemplo de query: `/comments/1?page=1`

```typescript
{
  page: {
    type: "number",
    integer: true,
    required: false
  }
}
```

**Retorna - `Status 200`**

```json
{
  "page": 1,
  "take": 20,
  "data": [
    {
      "id": 1,
      "content": "Conteúdo do comentário",
      "fatherId": null,
      "createAt": "2021-05-30T18:32:36.777Z",
      "updateAt": "2021-05-30T18:32:36.777Z",
      "haveChildren": false,
      "post": {
        "id": 1,
        "slug": "1621894076434-7328083f0948441d"
      },
      "author": {
        "name": "Alex Borges Ramos",
        "image": "minhaFotoDePerfil.png"
      }
    }
  ],
  "total": 1
}
```

#### Criar um comentário

Para criar um comentário uma requisição **`GET`** de ser feita para url **`/comments/:postId`**, exemplo: `/comments/1`. O token da seção também deve ser informado no **Header** da requisição, através do campo *Authorization*, tendo o seguinte formato: `Bearer <token>`.

**Recebe:**

```typescript
{
  content: {
    min: 1,
    type: "string",
    required: true
  },

  fatherId: {
    min: 1,
    type: "number",
    integer: true,
    required: false
  }
}
```

**Retorna - `Status 200`**

```json
{
  "message": "Comment created successfully",
  "data": {
    "id": 1,
    "content": "O conteúdo do comentário",
    "fatherId": null,
    "createAt": "2021-05-30T18:32:36.777Z",
    "updateAt": "2021-05-30T18:32:36.777Z",
    "haveChildren": false,
    "post": {
      "id": 1,
      "slug": "1621894076434-7328083f0948441d"
    },
    "author": {
      "name": "Alex Borges Ramos",
      "image": "minhaFotoDePerfil.png"
    }
  }
}
```

#### Deletar um comentário

Para deletar um comentário, uma requisição **`DELETE`** de ser feita para **`/comments/:commentId`**, exemplo: `/comments/1`. O token da seção também deve ser informado no **Header** da requisição, através do campo *Authorization*, tendo o seguinte formato: `Bearer <token>`.

**Retorna - `Status 200`**

```json
{
  "message": "Comment deleted successfully"
}
```

---

### Reações

Responsável por controlar as reações dos usuários em relação aos posts, podendo criar, alterar e deleta-las, estando disponível no memento apenas a reação de *like*.

#### Criar uma reação

Para criar uma reação uma requisição **`POST`** deve ser feita para **`/reactions/:postId`**, exemplo: `/reactions/1`. O token da seção também deve ser informado no **Header** da requisição, através do campo *Authorization*, tendo o seguinte formato: `Bearer <token>`.

> :information_source: No momento, a reação criada *like* é criada por default, sendo a única reação disponível.

**Retorna - `Status 201`**

```json
{
  "message": "Reaction created successfully"
}
```

#### Deletando uma reação

Para deletar uma reação uma requisição **`DELETE`** de ser feita para **`/reactions/:postId`**, exemplo: `/reactions/1`. O token da seção também deve ser informado no **Header** da requisição, através do campo *Authorization*, tendo o seguinte formato: `Bearer <token>`.

**Retorna - `Status 200`**

```json
{
  "message": "Reaction deleted successfully"
}
```

---

### Posts Salvos

Responsável por obter, salvar e remover posts da lista de posts salvos dos usuários.

#### Obter posts salvos pelo usuário

Para obter a lista de posts salvos de um usuário, uma requisição **`GET`** deve ser feita para **`/saved/posts`**. O token da seção também deve ser informado no **Header** da requisição, através do campo *Authorization*, tendo o seguinte formato: `Bearer <token>`.

**Recebe as Queries:**

Exemplo de query: `/saved/posts?page=1`

```typescript
{
  page: {
    type: "number",
    integer: true,
    required: false
  }
}
```

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
      "saved": true,
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

#### Salvar um post

Para adicionar/salvar um post na lista de posts salvos do usuário, uma requisição **`POST`** deve ser feita para **`/saved/posts/:postId`**, exemplo: `/saved/posts/1`. O token da seção também deve ser informado no **Header** da requisição, através do campo *Authorization*, tendo o seguinte formato: `Bearer <token>`.

**Retorna - `Status 200`**

```json
{
  "message": "Saved post successfully"
}
```

#### Remover um post da lista de posts salvos

Para remover um post da list de posts salvos do usuário, uma requisição **`DELETE`** deve ser feita para **`/saved/posts/:postId`**, exemplo: `/saved/posts/1`. O token da seção também deve ser informado no **Header** da requisição, através do campo *Authorization*, tendo o seguinte formato: `Bearer <token>`.

**Retorna - `Status 200`**

```json
{
  "message": "The post has been removed from your list of saved posts"
}
```
