// Arquivo: backend/src/models/User.js
// Descrição: Modelo Mongoose para usuários com nome, email único e senha obrigatórios.

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' } // <- aqui
});


const User = mongoose.model('User', userSchema);

module.exports = User;
