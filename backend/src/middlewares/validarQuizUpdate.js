// validarQuizUpdate.js
module.exports = (req, res, next) => {
  const { pergunta, alternativas, respostaCorreta } = req.body;

  // Verifica se há pelo menos um campo para atualizar
  if (!pergunta && !alternativas && !respostaCorreta) {
    return res.status(400).json({ error: 'Nenhum dado para atualizar' });
  }

  // Se alternativas vierem, todas devem estar preenchidas
  if (alternativas) {
    if (!alternativas.A || !alternativas.B || !alternativas.C || !alternativas.D) {
      return res.status(400).json({ error: 'Todas as alternativas (A, B, C, D) são obrigatórias' });
    }
  }

  // Se respostaCorreta vier, deve ser uma das opções válidas
  if (respostaCorreta && !['A', 'B', 'C', 'D'].includes(respostaCorreta)) {
    return res.status(400).json({ error: 'Resposta correta inválida (deve ser A, B, C ou D)' });
  }

  next();
};
