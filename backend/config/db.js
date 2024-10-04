const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/gestion_productos';
    await mongoose.connect(dbURI);
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error al conectar a MongoDB', error);
    process.exit(1);
  }
};

module.exports = connectDB;
