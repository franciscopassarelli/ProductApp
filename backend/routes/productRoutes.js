const express = require('express');
const Product = require('../models/Product');
const router = express.Router(); // Usar router en lugar de app

// Ruta para obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los productos' });
  }
});

// Ruta para agregar un producto
router.post('/', async (req, res) => {
  const { name, barcode, price, description } = req.body;

  try {
    const newProduct = new Product({ name, barcode, price, description });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: 'Error al agregar el producto', error: err.message });
  }
});

// Ruta para eliminar un producto por código de barras
router.delete('/:barcode', async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ barcode: req.params.barcode });
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto' });
  }
});

// Ruta para actualizar un producto por código de barras
router.put('/:barcode', async (req, res) => {
  const { barcode } = req.params;
  const { name, price, description } = req.body;

  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { barcode },
      { name, price, description },
      { new: true } // Retornar el producto actualizado
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error('Error al actualizar el producto', error);
    res.status(500).json({ message: 'Error al actualizar el producto' });
  }
});

module.exports = router;
