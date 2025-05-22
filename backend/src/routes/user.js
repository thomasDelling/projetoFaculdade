const express = require("express");
const router = express.Router();
const User = require("../models/User");

// CREATE - Novo usuário
router.post("/", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
      return res.status(400).json({ mensagem: "Todos os campos são obrigatórios" });
    }

    const novoUsuario = await User.create({ nome, email, senha });
    res.status(201).json(novoUsuario);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao criar usuário", detalhes: err.message });
  }
});

// READ - Listar todos
router.get("/", async (req, res) => {
  const usuarios = await User.find();
  res.json(usuarios);
});

// READ - Buscar por ID
router.get("/:id", async (req, res) => {
  try {
    const usuario = await User.findById(req.params.id);
    if (!usuario) return res.status(404).json({ mensagem: "Usuário não encontrado" });
    res.json(usuario);
  } catch {
    res.status(400).json({ mensagem: "ID inválido" });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const atualizado = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!atualizado) return res.status(404).json({ mensagem: "Usuário não encontrado" });
    res.json(atualizado);
  } catch {
    res.status(400).json({ mensagem: "ID inválido" });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deletado = await User.findByIdAndDelete(req.params.id);
    if (!deletado) return res.status(404).json({ mensagem: "Usuário não encontrado" });
    res.json({ mensagem: "Usuário deletado" });
  } catch {
    res.status(400).json({ mensagem: "ID inválido" });
  }
});

module.exports = router;
