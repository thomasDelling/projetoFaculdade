# 🎯 **ArenaQuizz — Projeto Acadêmico de Microsserviços**

![ArenaQuizz Banner](https://img.shields.io/badge/Microsserviços-Ativo-blue) ![React](https://img.shields.io/badge/React-Vite-informational) ![Docker](https://img.shields.io/badge/Docker-Orquestração-blue) ![MongoDB](https://img.shields.io/badge/MongoDB-green)

---

## 🧠 **Descrição do Projeto**

**ArenaQuizz** é um jogo web de perguntas e respostas que une aprendizado e diversão. Usuários podem jogar quizzes, além de criar e editar suas próprias perguntas — promovendo uma experiência interativa e personalizada.

🎓 Este projeto foi desenvolvido para aplicação prática das disciplinas:

- **Sistemas Distribuídos e mobile**
- **Usabilidade, Desenvolvimento Web, Mobile e Jogos**

🔧 Envolve autenticação, banco relacional, microsserviços, frontend moderno com React, além de deploy com Docker.

---

## 🚀 **Funcionalidades Principais**

- ✅ Login e Cadastro de Usuários
- ✅ Controle de Acesso (Usuário e Admin)
- ✅ CRUD de Usuários (Admin)
- ✅ CRUD de Perguntas do Quiz (Admin)
- ✅ Jogo Interativo de Quiz
- ✅ Criação/Edição de Quizzes
- ✅ Microsserviços intercomunicando
- ✅ Deploy via Docker e Docker Compose

---

## 🧪 **Tecnologias Utilizadas**

| Camada          | Tecnologias                               |
| --------------- | ----------------------------------------- |
| **Frontend**    | React + Vite, JavaScript, CSS             |
| **Backend**     | Node.js, Express, Mongoose                |
| **Banco**       | MongoDB Atlas                             |
| **DevOps**      | Docker, Docker Compose                    |
| **Ferramentas** | GitHub, Git Bash, Trello, Postman, VSCode |

---

## 🗂️ **Estrutura do Projeto**

```plaintext
projetoFaculdade/
├── backend/
│   ├── auth-service        # Serviço de login e controle de roles
│   ├── user-service        # CRUD de usuários (somente Admin)
│   ├── quiz-service        # CRUD e lógica do jogo
│   └── docker-compose.yml  # Orquestração dos microsserviços
├── frontend/               # Aplicação React + Vite
├── docker-compose.yml      # Orquestração geral (Frontend + Backend)
├── README.md               # Este arquivo
```

---

## 🛠️ **Como Rodar o Projeto**

### 1️⃣ Clone o repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd projetoFaculdade
```

### 2️⃣ Crie os arquivos `.env` para **cada microsserviço** com seu respectivo conteúdo:

> Substitua `<usuario>`, `<senha>` e `<cluster>` pelas suas informações do MongoDB Atlas.

#### auth-service

```env
PORT=3001
MONGO_URI=mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/auth
```

#### user-service

```env
PORT=3002
MONGO_URI=mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/users
```

#### quiz-service

```env
PORT=3003
MONGO_URI=mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/quizzes
```

⚠️ **As URIs reais não estão aqui por questões de segurança.**

---

### 📦 Instale as dependências

```bash
npm run install-all
```

### ▶️ Inicie a aplicação

```bash
npm run start
# ou usando Docker
docker-compose up --build
```

---

## 🔐 **Conta de Administrador (Manual)**

Use o **Postman** para registrar um admin via:

```http
POST http://localhost:3001/api/auth/register
```

Corpo da requisição:

```json
{
  "nome": "Admin",
  "email": "admin@admin.com",
  "senha": "admin123",
  "role": "admin"
}
```

---

## 📑 **Endpoints Disponíveis**

### 🔐 Auth (Login e Registro)

| Método | Rota                 | Descrição                  |
| ------ | -------------------- | -------------------------- |
| POST   | `/api/auth/register` | Registrar usuário ou admin |
| POST   | `/api/auth/login`    | Realizar login             |

### 👥 Usuários (Admin)

| Método | Rota             | Descrição             |
| ------ | ---------------- | --------------------- |
| GET    | `/api/users`     | Listar todos os users |
| POST   | `/api/users`     | Criar novo usuário    |
| PUT    | `/api/users/:id` | Atualizar usuário     |
| DELETE | `/api/users/:id` | Deletar usuário       |

### ❓ Quiz

| Método | Rota               | Descrição           |
| ------ | ------------------ | ------------------- |
| GET    | `/api/quizzes`     | Listar perguntas    |
| POST   | `/api/quizzes`     | Criar nova pergunta |
| PUT    | `/api/quizzes/:id` | Editar pergunta     |
| DELETE | `/api/quizzes/:id` | Deletar pergunta    |

---

## 🎮 **Sobre o Jogo**

- 🧠 Jogo com foco em **educação e diversão**
- ✏️ Admins podem criar e editar quizzes personalizados
- 💡 Experiência dinâmica, divertida e customizável

---

## 🎓 **Objetivos Acadêmicos**

Este projeto visa:

- Aplicar arquitetura de **microsserviços**
- Integrar **frontend e backend**
- Utilizar bancos **Mongo**
- Realizar deploy com **Docker**
- Desenvolver um produto com **usabilidade** e **interação**

---

## ⚠️ Aviso Importante

> 🔒 Projeto **exclusivamente acadêmico**.  
> **Não use dados reais ou sensíveis.**  
> Senhas **não são criptografadas.**

---

## 👥 **Autores**

- Thomas Max Delling
- Pedro Arthur Canavezi
- João Victor Rosa de Jesus

---

### 👨‍💻 Desenvolvido por

**Equipe ArenaQuizz — 4º semestre**  
Análise e Desenvolvimento de Sistemas — Universidade São Judas
