
# 🎯 ArenaQuizz

**Versão final —** Pequenas melhorias visuais e funcionais aplicadas.

---

## 🚀 Como rodar o projeto

1. Clone o repositório:
```bash
git clone <URL_DO_REPOSITORIO>
```

2. Na **raiz do projeto**, execute:
```bash
npm run install-all
```
*(Instala as dependências da raiz,  backend e frontend automaticamente)*

3. Para rodar tudo junto (backend + frontend):
```bash
npm run start
```
Acesse o frontend em 👉 **http://localhost:5173**  
O backend roda em 👉 **http://localhost:3000**

---

## 🛠️ Tecnologias usadas

- ⚙️ Node.js (Express + MongoDB)
- 🎨 React (Vite)

---

## 🗂️ Estrutura de pastas

```
/projeto
├── backend     → API, banco de dados (MongoDB)
├── frontend    → Interface (React + Vite)
├── package.json → Scripts para rodar tudo junto
```

---

## 🔐 Conta de administrador

Para criar um admin, use o Postman no endpoint:

```
POST → http://localhost:3000/usuarios
```

Com o JSON no corpo da requisição:

```json
{
  "nome": "Nome",
  "email": "nome@dev.com",
  "senha": "senha",
  "role": "admin"
}
```

---

## 🚧 Próximos passos

- 🔓 Sistema de logout  
- 👤 Perfil do jogador  
- 🎨 Melhorias na estilização

---

## 👥 Autores

- Thomas Max Delling  
- Pedro Arthur Canavezi  
- João Victor Rosa de Jesus  
