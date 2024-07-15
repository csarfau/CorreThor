# CorreThor

Aplicação criada utilizando Next.js e Express, com typescript para o desenvolvimento do lado do servidor, e React do lado do cliente.

## Índice

- [Sobre](#sobre)
- [Instalação](#instalação)
- [Pre-requisitos](#pre-requisitos)
- [Passos](#passos)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)

## Sobre

Este projeto é uma aplicação web que permite aos usuários criar, editar e deletar correções. Ele utiliza Next.js e Express, com TypeScript para o desenvolvimento do lado do servidor e do lado do cliente utiliza ReactJs. 
O intuito da aplicação é treinar os conhecimento tanto no backend criando um servidor com Next.js e Express, e também no frontend com o React.
A aplicação se resume em um controle de corretores e correções, feitas por um administrador, como se fosse um diretor de um curso o admin, os professores os corretores e as correções seriam como provas dos alunos. 

## Instalação

Para a instalação do projeto, você pode seguir o passo a passo a seguir.

### Pre-requisitos

- Node.js
- Npm
  
### Passos

1. Clone o repositório
2. Acesse o diretório: cd .\CorreThor\backend
3. Execute o comando no terminal para instalar as dependências do backend: "npm install"
4. Crie um arquivo .env, seguindo o padrão fornecido pelo .env-example com todas as variáveis de ambiente necessárias para executar o projeto. Coloque a porta diferente de 3000.
5. Execute o comando "npm run prod", e então seu servidor estará no ar
6. Abra um novo terminal, ainda dentro do repositório onde foi clonado o projeto, e acesse o diretório: cd .\CorreThor\frontend
7. Execute o comando no terminal para instalar as dependências do frontend: "npm install"
8. Após instalar todas as dependências, execute o comando "npm start", e sua aplicação deve estar no ar, acessível pelo http://localhost:3000
9. Para configurar o banco de dados, utilize os arquivos .sql de criação de tabelas, e inserção de dados para teste.

## Tecnologias Utilizadas

- Next.js
- Express
- TypeScript
- React
- MUI
