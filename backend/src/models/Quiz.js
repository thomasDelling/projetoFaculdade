const mongoose = require('mongoose');

const alternativaSchema = new mongoose.Schema({
  id: { type: String, required: true },   // "a", "b", "c" ou "d"
  texto: { type: String, required: true }
});

const quizSchema = new mongoose.Schema({
  pergunta: { type: String, required: true },
  alternativas: { type: [alternativaSchema], required: true },
  respostaCorreta: { type: String, required: true } // id da alternativa correta
});

module.exports = mongoose.model('Quiz', quizSchema);
