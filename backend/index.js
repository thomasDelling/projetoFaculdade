const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const authRoutes = require("./src/routes/auth");
const quizRoutes = require("./src/routes/quiz");
const userRoutes = require("./src/routes/user");

const uri = 'mongodb+srv://thomasmaxdelling6:ThomasAIAI@a3.rlncqod.mongodb.net/DBA3?retryWrites=true&w=majority';

// ✅ middleware deve vir primeiro
app.use(cors());
app.use(express.json());

// ✅ rotas depois
app.use('/auth', authRoutes);
app.use('/quiz', quizRoutes);
app.use('/usuarios', userRoutes);

mongoose.connect(uri)
  .then(() => console.log("🟢 MongoDB conectado"))
  .catch(err => console.error("❌ Erro ao conectar:", err));

app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

app.listen(3000, () => {
  console.log("🚀 Servidor rodando na porta 3000");
});
