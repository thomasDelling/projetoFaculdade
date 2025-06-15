const User = require("../models/User");

exports.registerUser = async (req, res) => {
  const { nome, email, senha, role } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ error: "Campos obrigatórios faltando" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email já registrado" });
    }

    const newUser = new User({
      nome,
      email,
      senha,
      role: role || "user",
    });

    await newUser.save();

    res.status(201).json({ message: "Usuário criado com sucesso", user: newUser });
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar usuário", details: err.message });
  }
};

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
