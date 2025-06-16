module.exports = (req, res, next) => {
  const { pergunta, alternativas, respostaCorreta } = req.body;

  if (!pergunta || !alternativas || !respostaCorreta) {
    return res.status(400).json({ error: "Campos obrigatórios faltando" });
  }

  if (
    !alternativas.A ||
    !alternativas.B ||
    !alternativas.C ||
    !alternativas.D
  ) {
    return res
      .status(400)
      .json({ error: "Todas as alternativas (A, B, C, D) são obrigatórias" }); // All alternatives (A, B, C, D) are required
  }

  if (!["A", "B", "C", "D"].includes(respostaCorreta)) {
    return res
      .status(400)
      .json({ error: "Resposta correta inválida (deve ser A, B, C ou D)" });
  }

  next();
};
