const express = require("express");
const router = express.Router();

let usuarios = [];
let proximoId = 1;

//CREATE - criação de usuario

router.post("/", (req, res) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) {
    return res.status(400).json({ mensagem: "nome, email e senha são obrigatorios" });
  }

  const novoUsuario = {
    id: proximoId++,
    nome,
    email,
    senha,
  };

  usuarios.push(novoUsuario);
res.status(201).json({ mensagem: "usuario criado", usuarios: novoUsuario });

});

// READ - Listar todos usuarios

router.get("/", (req, res) => {
  res.json(usuarios);
});

// READ - buscar usuario por ID

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = usuarios.find((u) => u.id === id);
  if (!usuario) {
    return res.status(404).json({ mensagem: "Usuário não encontrado" });
  }
  res.json(usuario);
});

// UPDATE - Atualizar usuário por ID
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = usuarios.find((u) => u.id === id);
  if (!usuario) {
    return res.status(404).json({ mensagem: "Usuário não encontrado" });
  }

  const { nome, email, senha } = req.body;
  if (nome) usuario.nome = nome;
  if (email) usuario.email = email;
  if (senha) usuario.senha = senha;

  res.json({ mensagem: "Usuário atualizado", usuario });
});

// DELETE - Deletar usuário por ID
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = usuarios.findIndex((u) => u.id === id);
  if (index === -1) {
    return res.status(404).json({ mensagem: "Usuário não encontrado" });
  }
  usuarios.splice(index, 1);
  res.json({ mensagem: "Usuário deletado" });
});

module.exports = router;
