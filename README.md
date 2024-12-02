# Transaction API

## Descrição do Projeto

Esta é uma API RESTful de gerenciamento de transações construída com Node.js, Fastify, Knex.js e SQLite. A aplicação permite aos usuários criar, visualizar e resumir transações financeiras, com suporte para sessões de usuário baseadas em cookies.

## Funcionalidades Principais

- Criar novas transações (crédito ou débito)
- Listar todas as transações de uma sessão
- Visualizar detalhes de uma transação específica
- Obter resumo das transações (valor total)
- Gerenciamento automático de sessões de usuário

## Pré-requisitos

- Node.js (v18 ou superior)
- npm | yarn | pnpm

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/mayromyller/transactions-api.git
```

2. Instale as dependências:
```bash
npm install
```

## Configuração de Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
DATABASE_URL=caminho/para/seu/banco/de/dados.sqlite
NODE_ENV=development
PORT=8000
```

Para ambientes de teste, use `.env.test` com configurações específicas.

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor em modo de desenvolvimento
- `npm run build`: Compila o projeto para produção
- `npm run test`: Executa os testes
- `npm run knex`: Executa comandos do Knex.js
- `npm run lint`: Verifica a qualidade do código

## Exemplo de Uso

### Criando uma Transação

```bash
# Exemplo usando curl
curl -X POST http://localhost:8000/transactions \
     -H "Content-Type: application/json" \
     -d '{
         "title": "Salário",
         "amount": 5000,
         "type": "credit"
     }'
```

### Listando Transações

```bash
# Listar todas as transações da sessão atual
curl http://localhost:8000/transactions
```

## Tecnologias Utilizadas

- **Backend**: Node.js, Fastify
- **Banco de Dados**: SQLite, Knex.js
- **Validação**: Zod
- **Desenvolvimento**: TypeScript, TSX
- **Testes**: Vitest

## Segurança e Sessões

A aplicação utiliza cookies de sessão para identificar e agrupar transações de um mesmo usuário. As sessões têm duração de 7 dias.

