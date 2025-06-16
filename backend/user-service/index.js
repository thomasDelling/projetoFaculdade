const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./Routes/user");

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true,
  })
);

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado [User]"))
  .catch((err) => console.error(err));

app.use("/users", userRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`User Service rodando na porta ${PORT}`);
});
