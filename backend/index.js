const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

app.use(cors());

const uri = 'mongodb+srv://thomasmaxdelling6:ThomasAIAI@a3.rlncqod.mongodb.net/DBA3?retryWrites=true&w=majority';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("🟢 MongoDB conectado"))
.catch((err) => console.error("❌ Erro ao conectar no MongoDB:", err));

app.use(express.json());

// Rota teste
app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

// Rotas de usuário
const userRoutes = require("./src/routes/user");
app.use("/usuarios", userRoutes);

// Subindo servidor
app.listen(3000, () => {
  console.log("🚀 Servidor rodando na porta 3000");
});
