const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Importación de CORS
const productRoutes = require('./routes/productRoutes'); // Importa las rutas de productos

// Configura la aplicación de Express
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Middleware para habilitar CORS
app.use(cors()); // Habilita CORS para todas las rutas

// Variables de entorno (PORT y MongoDB URI)
const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/gestion_productos';

// Conexión a MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

// Rutas de productos
app.use('/api/products', productRoutes);

// Manejo de rutas no existentes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Manejo global de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Error en el servidor' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
