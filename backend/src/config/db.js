const mongoose = require('mongoose');

const connectDB = async () => {   
  try {
    await mongoose.connect('mongodb+srv://thomasmaxdelling6:ThomasAIAI@a3.rlncqod.mongodb.net/DBA3', { // Conexão com o MongoDB Atlas
      useNewUrlParser: true, 
      useUnifiedTopology: true,
    });

    
  } catch (error) {
    console.error('❌ Erro ao conectar no MongoDB', error); 
    process.exit(1); 
  }
};

module.exports = connectDB;