# 🎯 ArenaQuizz

-----

## ✨ Visão Geral

ArenaQuizz é uma aplicação web dinâmica construída com **Node.js (Express, MongoDB)** para o backend e **React (Vite)** para o frontend. Este projeto combina uma API robusta com uma interface de usuário responsiva, oferecendo uma experiência contínua.

-----

## 🚀 Como Rodar o Projeto

Siga estes passos simples para ter o ArenaQuizz funcionando na sua máquina local.

### ⬇️ Clone o Repositório

```bash
git clone <URL_DO_REPOSITORIO>
```

### 📦 Instale as Dependências

Navegue até o diretório raiz do projeto e execute o seguinte comando para instalar todas as dependências necessárias para o backend e o frontend:

```bash
npm run install-all
```

### ▶️ Inicie a Aplicação

Uma vez que as dependências estejam instaladas, você pode iniciar tanto o backend quanto o frontend simultaneamente:

```bash
npm run start
```

## 🛠️ Tecnologias Utilizadas

  * **Backend:** ⚙️ Node.js (Express, MongoDB)
  * **Frontend:** 🎨 React (Vite)
  * **Teste de API:** Postman

-----

## 🗂️ Estrutura de Pastas

O projeto está organizado nos seguintes diretórios:

```
/projeto
├── backend       → Lida com a API e o banco de dados (MongoDB)
├── frontend      → Contém a interface do usuário (React + Vite)
├── package.json  → Inclui scripts para rodar toda a aplicação
```

-----

## 🔐 Configuração da Conta de Administrador

Para criar uma conta de administrador, use o **Postman** para enviar uma requisição `POST` para o seguinte endpoint:

```
POST → http://localhost:3001/api/auth/register
```

Inclua o seguinte JSON no corpo da requisição:

```json
{
  "nome": "Admin",
  "email": "admin@admin.com",
  "senha": "admin123",
  "role": "admin"
}
```

-----

## 🚧 Próximos Passos

  * 🔓 Implementar um sistema robusto de fluxo e sessões de usuário.
  * 👤 Desenvolver perfis de jogador opcionais.
  * 🎨 Melhorar a estilização e as animações para uma aparência mais polida.

-----

## 👥 Autores

  * Thomas Max Delling
  * Pedro Arthur Canavezi
  * João Victor Rosa de Jesus