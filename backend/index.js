const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("servidor funcionando");
});

const userRoutes = require("./src/routes/users");
app.use("/usuarios", userRoutes);

app.listen(3000, () => {
  console.log("servidor rodando na porta 3000");
});
