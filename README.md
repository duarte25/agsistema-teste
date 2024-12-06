# Teste AG Sistemas
Criado 2 API, uma em Nest.js e o banco em PostgreSQL assim como pedido em primeiro exercício, a outra em Express.js e em MongoDB conforme quinto exercício, como não definia banco nem framework ou linguagem utilizei a mesma da descrição da vaga divulgada anteriormente e um CRUD básico em Next.js e React.

Online em {Disponibilizar URL}

## MongoDB
Garanta que a conexão com o banco de dados MongoDB está com o url correto, via variável de ambiente DB_URL

> A url DB_URL seria então `mongodb://root:panelaNotificacaoDB@auth-mongo:27017/panelanotificacaodb?authSource=admin`

## PostgreSQL
Garanta que a conexão com o banco de dados PostgreSQL está correto

> Rodando na PORT `5432`

## Docker

Quando executa o docker compose up já será iniciado um container local da API de autenticação, o front-end e a API de produtos.

## Instruções com docker compose

Com docker compose basta executar:

```
docker compose up --build -d
docker exec auth-api npm run seed
```

> Faça o comando sem a opção `-d` caso queira travar o terminal e acompanhar o log da aplicação (E do banco)

## Como utilizar

Logo após, todos os passos de subir as aplicações estarão rodando nessas URL em sua máquina.

> A url API AUTH seria então `http://localhost:3010` e na WEB através `https://gustavo-3010.code.fslab.dev`

A API AUTH possui uma documentação e segue exemplo de uso.

> A url FRONT seria então `http://localhost:3001` e na WEB através `https://gustavo-3001.code.fslab.dev`

O Front-End é bem básico, conta com um CRUD sendo possível criar, listar, deletar e editar conforme pedido em exercício. 

> A url FRONT seria então `http://localhost:3000` e na WEB através `https://gustavo-3000.code.fslab.dev`

A API do produto conforme pedido no primeiro exercício, não há documentação, mas pode ser acessada via Postman ou qualquer aplicação do tipo e conta com as principais rodas.

> POST `http://localhost:3000/produtos` 

```
    {
    "nome": "Produto Teste",
    "preco": 9.22,
    "descricao": "Este é um produto de teste."
    }
```

> GET `http://localhost:3000/produtos` 

> GET `http://localhost:3000/produtos/id` 

> DELETE `http://localhost:3000/produtos/id` 

> PUT `http://localhost:3000/produtos/id` 

```
    {
    "nome": "Produto Teste",
    "preco": 9.22,
    "descricao": "Este é um produto de teste."
    }
```

## Autores
* Gustavo Vinicius Duarte Da Silva - Desenvolvedor - [Portfolio](https://duarte25.github.io/portfolio/)