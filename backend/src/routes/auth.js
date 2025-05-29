// backend/src/routes/auth.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// POST /auth/login
router.post("/login", async (req, res) => {
  const { email, senha } = req.body;
  try {
    const user = await User.findOne({ email, senha });
    if (!user) return res.status(401).json({ error: "Credenciais inválidas" });
    res.json({ message: "Login bem-sucedido", user });
  } catch (err) {
    res.status(500).json({ error: "Erro interno" });
  }
});

module.exports = router;
