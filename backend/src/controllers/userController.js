const User = require('../models/User');

// POST /register
exports.registerUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET /users
exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

// GET /users/:id
exports.getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
  res.json(user);
};

// PUT /users/:id
exports.updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(user);
};

// DELETE /users/:id
exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'Usuário deletado com sucesso!' });
};
