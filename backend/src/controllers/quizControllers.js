const Quiz = require('../models/Quiz');

// ✅ Criar Quiz
exports.createQuiz = async (req, res) => {
  try {
    const { pergunta, alternativas, respostaCorreta } = req.body;

    if (!pergunta || !alternativas || !respostaCorreta) {
      return res.status(400).json({ error: 'Campos obrigatórios faltando' });
    }

    const novoQuiz = new Quiz({
      pergunta,
      alternativaA: alternativas.A,
      alternativaB: alternativas.B,
      alternativaC: alternativas.C,
      alternativaD: alternativas.D,
      respostaCorreta
    });

    await novoQuiz.save();
    res.status(201).json(novoQuiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar quiz' });
  }
};

// ✅ Buscar todos
exports.getAllQuiz = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar quizzes' });
  }
};

// ✅ Buscar por ID
exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ error: 'Quiz não encontrado' });
    res.json(quiz);
  } catch (error) {
    res.status(400).json({ error: 'ID inválido' });
  }
};

// ✅ Atualizar
exports.updateQuiz = async (req, res) => {
  try {
    const { pergunta, alternativas, respostaCorreta } = req.body;

    const updateData = { pergunta, respostaCorreta };

    if (alternativas) {
      updateData.alternativaA = alternativas.A;
      updateData.alternativaB = alternativas.B;
      updateData.alternativaC = alternativas.C;
      updateData.alternativaD = alternativas.D;
    }

    const quiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!quiz) return res.status(404).json({ error: 'Quiz não encontrado' });

    res.json(quiz);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Erro ao atualizar quiz' });
  }
};

// ✅ Deletar
exports.deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) return res.status(404).json({ error: 'Quiz não encontrado' });

    res.json({ mensagem: 'Quiz deletado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Erro ao deletar quiz' });
  }
};
