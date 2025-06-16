const mongoose = require("mongoose"); // Importando o mongoose para interagir com o MongoDB

const quizSchema = new mongoose.Schema(
  {
    pergunta: { type: String, required: true },
    alternativas: {
      A: { type: String, required: true },
      B: { type: String, required: true },
      C: { type: String, required: true },
      D: { type: String, required: true },
    },
    respostaCorreta: {
      type: String,
      required: true,
      enum: ["A", "B", "C", "D"],
    },
  },
  { timestamps: false }
);

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;