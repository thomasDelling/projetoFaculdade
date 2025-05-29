const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./src/routes/auth");
const quizRoutes = require("./src/routes/quiz");
const userRoutes = require("./src/routes/user");

const app = express();

// ✅ Conexão com MongoDB
const uri = 'mongodb+srv://thomasmaxdelling6:ThomasAIAI@a3.rlncqod.mongodb.net/DBA3?retryWrites=true&w=majority';
mongoose.connect(uri)
  .then(() => console.log("🟢 MongoDB conectado"))
  .catch(err => console.error("❌ Erro ao conectar:", err));

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ Rotas
app.use('/auth', authRoutes);
app.use('/quizzes', quizRoutes);
app.use('/usuarios', userRoutes);

// ✅ Rota teste
app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

// ✅ Servidor
app.listen(3000, () => {
  console.log("🚀 Servidor rodando na porta 3000");
});
