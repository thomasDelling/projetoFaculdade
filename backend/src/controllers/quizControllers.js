exports.createQuiz = async (req, res) => {
  try {
    const { pergunta, alternativas, respostaCorreta } = req.body;

    if (!pergunta || !alternativas || !respostaCorreta) {
      return res.status(400).json({ error: 'Campos obrigatórios faltando' });
    }

    // Validar se alternativas tem exatamente 4 itens com ids únicos "a" a "d"
    const idsValidos = ['a', 'b', 'c', 'd'];
    const idsAlternativas = alternativas.map(a => a.id);
    const textosValidos = alternativas.every(a => typeof a.texto === 'string' && a.texto.trim() !== '');

    if (
      alternativas.length !== 4 ||
      !idsAlternativas.every(id => idsValidos.includes(id)) ||
      new Set(idsAlternativas).size !== 4 || // ids repetidos
      !textosValidos ||
      !idsValidos.includes(respostaCorreta)
    ) {
      return res.status(400).json({ error: 'Alternativas inválidas ou resposta correta inválida' });
    }

    const novoQuiz = new Quiz({ pergunta, alternativas, respostaCorreta });
    await novoQuiz.save();

    res.status(201).json(novoQuiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar quiz' });
  }
};

exports.updateQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const { pergunta, alternativas, respostaCorreta } = req.body;

    // Mesma validação do createQuiz
    const idsValidos = ['a', 'b', 'c', 'd'];
    const idsAlternativas = alternativas.map(a => a.id);
    const textosValidos = alternativas.every(a => typeof a.texto === 'string' && a.texto.trim() !== '');

    if (
      alternativas.length !== 4 ||
      !idsAlternativas.every(id => idsValidos.includes(id)) ||
      new Set(idsAlternativas).size !== 4 ||
      !textosValidos ||
      !idsValidos.includes(respostaCorreta)
    ) {
      return res.status(400).json({ error: 'Alternativas inválidas ou resposta correta inválida' });
    }

    const quizAtualizado = await Quiz.findByIdAndUpdate(
      id,
      { pergunta, alternativas, respostaCorreta },
      { new: true }
    );

    if (!quizAtualizado) {
      return res.status(404).json({ error: 'Quiz não encontrado' });
    }

    res.json(quizAtualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar quiz' });
  }
};
