const Quiz = require("../models/Quiz");

exports.createQuiz = async (req, res) => {
  try {
    const { pergunta, alternativas, respostaCorreta } = req.body; // Desestruturação dos dados recebidos

    const novoQuiz = new Quiz({
      pergunta,
      alternativas,
      respostaCorreta,
    });

    await novoQuiz.save();
    res.status(201).json(novoQuiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar quiz" });
  }
};

exports.getAllQuiz = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar quizzes" });
  }
};

exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({ error: "Quiz não encontrado" });
    }

    res.json(quiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar quiz" });
  }
};

exports.updateQuiz = async (req, res) => {
  try {
    const { pergunta, alternativas, respostaCorreta } = req.body;

    const updateData = {
      pergunta,
      alternativas,
      respostaCorreta,
    };

    const quiz = await Quiz.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!quiz) {
      return res.status(404).json({ error: "Quiz não encontrado" });
    }

    res.json(quiz);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Erro ao atualizar quiz" });
  }
};

exports.deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) return res.status(404).json({ error: "Quiz não encontrado" });

    res.json({ mensagem: "Quiz deletado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Erro ao deletar quiz" });
  }
};