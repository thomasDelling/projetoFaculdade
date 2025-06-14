// Arquivo: backend/src/config/db.js
// Descrição: Configuração de conexão com o MongoDB usando Mongoose

const mongoose = require('mongoose'); // Importa o Mongoose para manipulação do MongoDB

const connectDB = async () => {   
  try { // Tenta conectar ao MongoDB
    await mongoose.connect('mongodb+srv://thomasmaxdelling6:ThomasAIAI@a3.rlncqod.mongodb.net/DBA3', { // URL de conexão com o MongoDB
      useNewUrlParser: true, 
      useUnifiedTopology: true,
    });

    
  } catch (error) {
    console.error('❌ Erro ao conectar no MongoDB', error); // Log de erro caso a conexão falhe
    process.exit(1); // Encerra o processo com erro se a conexão falhar
  }
};

module.exports = connectDB; // Exporta a função connectDB para ser usada em outros arquivos
