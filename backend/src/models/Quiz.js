const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  pergunta: { type: String, required: true },
  alternativaA: { type: String, required: true },
  alternativaB: { type: String, required: true },
  alternativaC: { type: String, required: true },
  alternativaD: { type: String, required: true },
  respostaCorreta: { type: String, required: true },
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
