// Arquivo: backend/src/routes/user.js
// Descrição: Rotas para gerenciar usuários, incluindo registro, leitura, atualização e exclusão de usuários.

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.registerUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
