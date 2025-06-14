// Arquivo: backend/src/middlewares/error.js
// Descrição: Middleware para tratamento de erros na aplicação, captura erros e envia uma resposta padronizada.

function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ error: 'Ocorreu um erro interno' });
}

module.exports = errorHandler;
