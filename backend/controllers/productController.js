const Product = require('../models/Product');

// Función para agregar un producto
exports.addProduct = async (req, res) => {
  const { name, barcode, price, description } = req.body;
  try {
    const product = new Product({ name, barcode, price, description });
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al guardar el producto' });
  }
};

// Función para obtener un producto por código de barras
exports.getProductByBarcode = async (req, res) => {
  try {
    const product = await Product.findOne({ barcode: req.params.barcode });
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el producto' });
  }
};
