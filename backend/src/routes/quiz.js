const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizControllers');

router.post('/', quizController.createQuiz);            // Criar quiz
router.get('/', quizController.getAllQuiz);             // Listar todos
router.get('/:id', quizController.getQuizById);         // Buscar por ID
router.put('/:id', quizController.updateQuiz);          // Atualizar quiz
router.delete('/:id', quizController.deleteQuiz);       // Deletar quiz

module.exports = router;
