const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizControllers");

// CRUD de Quiz
router.post("/", quizController.createQuiz);
router.get("/", quizController.getAllQuiz);
router.get("/:id", quizController.getQuizById);
router.put("/:id", quizController.updateQuiz);
router.delete("/:id", quizController.deleteQuiz);

module.exports = router;
