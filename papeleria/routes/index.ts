import express from 'express';
import Product from '../db/models/products';


const router = express.Router();


// Obtener todos los productos
router.get('/products', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener productos', details: err });
  }
});

// Obtener un producto por ID
router.get('/product/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el producto', details: err });
  }
});

// Crear un nuevo producto
router.post('/product', async (req, res) => {
  const { name, description, price, stock } = req.body;
  try {
    const newProduct = await Product.create({ name, description, price, stock });
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear producto', details: err });
  }
});

// Actualizar un producto
router.put('/product/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock } = req.body;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    await product.update({ name, description, price, stock });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar producto', details: err });
  }
});

// Eliminar un producto
router.delete('/product/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    await product.destroy();
    res.status(200).json({ message: 'Producto eliminado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar producto', details: err });
  }
});

export default router;
