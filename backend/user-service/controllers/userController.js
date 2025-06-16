const User = require("../models/User");

exports.registerUser = async (req, res) => {
  try {
    const { nome, email, senha, role } = req.body;
    if (!nome || !email || !senha) {
      return res
        .status(400)
        .json({ mensagem: "Todos os campos são obrigatórios" });
    }

    const newUser = await User.create({
      nome,
      email,
      senha,
      role: role || "user",
    });

    res.status(201).json(newUser);
  } catch (err) {
    res
      .status(500)
      .json({ erro: "Erro ao criar usuário", detalhes: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res
      .status(500)
      .json({ erro: "Erro ao buscar usuários", detalhes: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }
    res.json(user);
  } catch {
    res.status(400).json({ mensagem: "ID inválido" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }
    res.json(user);
  } catch {
    res.status(400).json({ mensagem: "ID inválido" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }
    res.json({ mensagem: "Usuário deletado com sucesso!" });
  } catch {
    res.status(400).json({ mensagem: "ID inválido" });
  }
};
