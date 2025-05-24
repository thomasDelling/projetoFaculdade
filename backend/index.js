const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const quizRoutes = require("./src/routes/quiz");
const userRoutes = require("./src/routes/user");

const uri = 'mongodb+srv://thomasmaxdelling6:ThomasAIAI@a3.rlncqod.mongodb.net/DBA3?retryWrites=true&w=majority';

app.use(cors());          // 1. CORS primeiro
app.use(express.json());  // 2. Parser JSON depois

mongoose.connect(uri)
  .then(() => console.log("🟢 MongoDB conectado"))
  .catch(err => console.error("❌ Erro ao conectar:", err));

app.use('/quiz', quizRoutes);       // 3. Rotas
app.use('/usuarios', userRoutes);

app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

app.listen(3000, () => {
  console.log("🚀 Servidor rodando na porta 3000");
});
