# Teste Desenvolvedor FullStack Junior - Apollo

Este é o repositório com o código fonte desenvolvido para a vaga de desenvolvedor junior Full Stack.

## Instalação

Você precisará ter apenas o [NodeJS](https://nodejs.org) instalado na sua máquina, e após isso, clonar este repositório:
```sh
  $ git clone https://github.com/pedroht/apollo-teste.git
```

## API

### Instalação

Acesse a pasta backend e instale as dependências executando o seguinte comando:

```sh
  $ cd backend
  $ npm install
```
### Environment Variables

Copie o conteúdo do arquivo .env.example para .env. E adicione as informações necessárias:

DATABASE_URL

```sh
  $ cp .env.example .env
```

### Executando a aplicação

Execute o comando correspondente:
```sh
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## FRONTEND

### Instalação

Acesse a pasta frontend e instale as dependências executando o seguinte comando:

```sh
  $ cd frontend
  $ npm install
```
### Environment Variables

Copie o conteúdo do arquivo .env.example para .env. E adicione as informações necessárias:

VITE_API_URL=localhost:3000

```sh
  $ cp .env.example .env
```

### Executando a aplicação

Execute o comando correspondente:
```sh
# development
$ npm run dev

# build
$ npm run build

# preview
$ npm run preview
```

## Perguntas

1) What could be your first improvements if you had more implementation time?
R: Adicionaria autenticação e autorização no projeto, adicionaria as funcionalidades de CRUD para produtos e categorias que estão faltando.

2) Thinking about your solution, how would maintence be in case of adding new product categories? What would need to be changed?
R: Para o backend seria necessário adicionar os serviços para cadastro de novas categorias. Caso não precise adicionar nenhuma outra informação na categoria, não precisaria ser alterado nada, além da criação do serviço para cadastro da categoria.

3) What changes would need to be made to support updates in the product category's discount percentage so that whenever the discount percentage was changed, the new price would reflected in all products of the same category?
R: As formas que consigo imaginar são:
1 - Assim que houver alguma atualização na porcentagem de desconto da categoria, chamar um serviço que faria a busca de todas os produtos daquela categoria e atualizaria o valor do preço promocional com a nova porcentagem.
2 - Em vez de guardar o preço promocional do banco de dados, eu faria um mapeamento nos produtos e adicionaria o preço promocional antes de enviar para o cliente.