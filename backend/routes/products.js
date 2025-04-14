const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products with optional filtering
router.get('/', async (req, res) => {
  try {
    const { category, occasion, sort, limit } = req.query;
    let query = {};

    if (category) query.category = category;
    if (occasion) query.occasion = occasion;

    let products = Product.find(query);

    // Sorting
    if (sort) {
      const sortOptions = {
        'price-asc': { price: 1 },
        'price-desc': { price: -1 },
        'rating': { rating: -1 },
        'newest': { createdAt: -1 }
      };
      products = products.sort(sortOptions[sort] || { createdAt: -1 });
    }

    // Limiting
    if (limit) {
      products = products.limit(parseInt(limit));
    }

    const results = await products;
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product' });
  }
});

// Create product (admin only)
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product' });
  }
});

// Update product (admin only)
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product' });
  }
});

// Delete product (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product' });
  }
});

module.exports = router; 