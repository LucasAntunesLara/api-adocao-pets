# 🐾 API de Adoção de Pets

## 📋 Descrição do Projeto

Este projeto consiste em uma API RESTful desenvolvida para um sistema de adoção de animais de estimação. A aplicação permite o gerenciamento completo de usuários e pets, controle de acessos através de perfis estruturados (`admin` e `adopter`), autenticação segura via JSON Web Tokens (**JWT**) e o registro de adoções de animais.

Trata-se da avaliação prática **Prova P2** da disciplina de **Desenvolvimento de Serviços Web** do curso de Análise e Desenvolvimento de Sistemas (IFRS Campus Bento Gonçalves).

---

## 🛠️ Tecnologias Utilizadas

- **Runtime:** Node.js
- **Framework Web:** Express
- **Autenticação:** JSON Web Token (JWT) e Bcrypt (criptografia de senhas)
- **Padronização e Qualidade de Código:** ESLint e Prettier
- **Banco de Dados:** MySQL

---

## 📂 Arquitetura da Aplicação

O projeto foi desenvolvido seguindo uma arquitetura em camadas para garantir a separação clara de responsabilidades:

```text
├── /src
│   ├── config         # Configurações gerais (env, JWT, banco de dados)
│   ├── controllers    # Lógica de controle das requisições e respostas HTTP
│   ├── database       # Scripts de criação e população do banco de dados
│   ├── middlewares    # Validações de dados e controle de autenticação/autorização (JWT)
│   ├── models         # Mapeamento das entidades e abstração de dados
│   ├── routes         # Definição dos endpoints da API
│   └── services       # Regras de negócio da aplicação
├── /tests             # Arquivos de testes de integração (REST Client / Postman)
├── .eslintrc.json     # Configuração de linting do código
├── .prettierrc        # Configuração de formatação do código
└── README.md          # Documentação do projeto
```

---

## 🗄️ Estrutura do Banco de Dados

A API consome um banco de dados chamado `pets_db`. Abaixo estão descritas as tabelas e suas respectivas estruturas:

### 1. Tabela `users`

| Campo      | Tipo   | Descrição                                |
| ---------- | ------ | ---------------------------------------- |
| `id`       | INT    | Identificador único (Auto Incremento)    |
| `name`     | STRING | Nome completo                            |
| `email`    | STRING | E-mail (Único)                           |
| `password` | STRING | Senha criptografada com bcrypt           |
| `phone`    | STRING | Telefone de contato                      |
| `role`     | STRING | Perfil do usuário (`admin` ou `adopter`) |

### 2. Tabela `pets`

| Campo         | Tipo   | Descrição                                    |
| ------------- | ------ | -------------------------------------------- |
| `id`          | INT    | Identificador único (Auto Incremento)        |
| `name`        | STRING | Nome do pet                                  |
| `age`         | INT    | Idade aproximada em anos                     |
| `species`     | STRING | Espécie (ex: `dog`, `cat`)                   |
| `size`        | STRING | Porte do animal (`small`, `medium`, `large`) |
| `status`      | STRING | Situação (`available`, `adopted`)            |
| `description` | STRING | Texto opcional com informações adicionais    |

### 3. Tabela `adoptions`

| Campo           | Tipo | Descrição                                               |
| --------------- | ---- | ------------------------------------------------------- |
| `id`            | INT  | Identificador da adoção (Auto Incremento)               |
| `user_id`       | INT  | ID do usuário que realizou a adoção (Chave Estrangeira) |
| `pet_id`        | INT  | ID do pet adotado (Chave Estrangeira)                   |
| `adoption_date` | DATE | Data da adoção                                          |

---

## 🛑 Regras de Negócio Implementadas

- **Segurança:** As senhas dos usuários nunca são retornadas em formato JSON nas respostas da API.
- **Perfil Padrão:** Ao cadastrar um novo usuário, o campo `role` assume o valor padrão `"adopter"`.
- **Restrições de Acesso (Pets):** Apenas usuários com perfil `"admin"` podem cadastrar, atualizar ou remover pets.
- **Fluxo de Adoção:**
- Apenas usuários `"adopter"` podem adotar um pet.
- O pet precisa estar com o status `"available"` para que a adoção seja efetuada.
- Após concluir a adoção, o status do pet muda automaticamente para `"adopted"`.
- Pets com status `"adopted"` não podem ser readotados e nem removidos do sistema.
- Um usuário não pode adotar o mesmo pet mais de uma vez.

---

## 🚀 Como Executar o Projeto

### Pré-requisitos

Certifique-se de ter o **Node.js** e o gerenciador de pacotes (npm) instalados em sua máquina.

### Passos para Instalação

1. Clone o repositório:

```bash
git clone [https://github.com/LucasAntunesLara/api-adocao-pets.git](https://github.com/LucasAntunesLara/api-adocao-pets.git)
```

2. Acesse a pasta do projeto:

```bash
cd api-adocao-pets
```

3. Instale as dependências:

```bash
npm install
```

### Scripts Disponíveis (`package.json`)

- **Executar em modo de desenvolvimento:**

```bash
npm run dev
```

- **Executar a validação do ESLint:**

```bash
npm run lint
```

---

## 🛣️ Endpoints da API

### Rotas Públicas

| Método | Rota              | Descrição                                                 |
| ------ | ----------------- | --------------------------------------------------------- |
| `GET`  | `/pets/available` | Lista todos os pets com status "available"                |
| `POST` | `/users`          | Cadastra um novo usuário                                  |
| `POST` | `/login`          | Realiza autenticação e retorna o Token JWT (expira em 1h) |

### Rotas Protegidas (Requerem Token JWT)

#### Usuários

| Método   | Rota         | Descrição                           | Permissão de Acesso                 |
| -------- | ------------ | ----------------------------------- | ----------------------------------- |
| `GET`    | `/users`     | Lista todos os usuários do sistema  | `admin`                             |
| `GET`    | `/users/:id` | Busca os dados de um usuário por ID | `admin` ou o próprio usuário logado |
| `PUT`    | `/users/:id` | Atualiza os dados de um usuário     | `admin` ou o próprio usuário logado |
| `DELETE` | `/users/:id` | Remove um usuário do sistema        | `admin`                             |

#### Pets

| Método   | Rota        | Descrição                                      | Permissão de Acesso |
| -------- | ----------- | ---------------------------------------------- | ------------------- |
| `GET`    | `/pets`     | Lista todos os pets (inclusive adotados)       | `admin`             |
| `GET`    | `/pets/:id` | Busca um pet específico por ID                 | `admin`             |
| `POST`   | `/pets`     | Cadastra um novo pet no sistema                | `admin`             |
| `PUT`    | `/pets/:id` | Atualiza os dados de um pet existente          | `admin`             |
| `DELETE` | `/pets/:id` | Remove um pet (apenas se `status = available`) | `admin`             |

#### Adoções

| Método | Rota         | Descrição                                 | Permissão de Acesso |
| ------ | ------------ | ----------------------------------------- | ------------------- |
| `GET`  | `/adoptions` | Lista o histórico de todas as adoções     | `admin`             |
| `POST` | `/adoptions` | Registra a adoção de um animal disponível | `adopter`           |

---
