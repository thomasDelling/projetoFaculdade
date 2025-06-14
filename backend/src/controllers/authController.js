// backend/src/controllers/authController.js
const User = require("../models/User");

exports.login = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const user = await User.findOne({ email, senha });
    if (!user) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }
    res.json({
      message: "Login bem-sucedido",
      user: {
        id: user._id,
        nome: user.nome,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Erro interno" });
  }
};
