const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const connectDB = require('./src/config/db');
const errorHandler = require('./src/middlewares/error');

const authRoutes = require('./src/routes/auth');
const quizRoutes = require('./src/routes/quiz');
const userRoutes = require('./src/routes/user');


const app = express();

// ✅ Conectar no MongoDB
connectDB();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ Rotas
app.use('/auth', authRoutes);
app.use('/quiz', quizRoutes);
app.use('/usuarios', userRoutes);

// ✅ Rota teste
app.get('/', (req, res) => {
  res.send('Servidor funcionando 🔥');
});

// ✅ Tratamento de rotas não existentes
app.use((req, res) => {
  res.status(404).json({ mensagem: 'Rota não encontrada' });
});

// ✅ Middleware de erro
app.use(errorHandler);

// ✅ Subindo o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
