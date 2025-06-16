const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const quizRoutes = require("./routes/quiz");

dotenv.config();

const app = express(); // Cria uma instância do Express
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)

  .then(() => console.log("MongoDB conectado [Quiz]"))
  .catch((err) => console.error(err));

app.use("/quizzes", quizRoutes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Quiz Service rodando na porta ${PORT}`);
});
