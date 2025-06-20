const express = require("express"); // Importando o Express
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/", userController.registerUser);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
