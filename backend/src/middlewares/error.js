function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ error: 'Ocorreu um erro interno' });
}

module.exports = errorHandler;
