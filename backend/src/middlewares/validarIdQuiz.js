const mongoose = require('mongoose');

// Middleware para validar se o ID passado é um ObjectId válido do MongoDB
module.exports = (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  next(); // Continua para o controller se o ID for válido
};
