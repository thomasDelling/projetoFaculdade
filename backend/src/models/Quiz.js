const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  pergunta: { type: String, required: true },
  alternativas: [{ type: String, required: true }],
  respostaCorreta: { type: String, required: true }
});

module.exports = mongoose.model('Quiz', quizSchema);
