const mongoose = require('mongoose');
module.exports = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ mensagem: 'ID inválido' }); // Invalid ID format
  }
  next();
};
