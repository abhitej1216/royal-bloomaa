const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Get all products with optional filters

router.get('/', async (req, res) => {
  try {
    const { gender, category, brand } = req.query;
    const filter = {};
    if (gender) filter.gender = gender;
    if (category) filter.category = category;
    if (brand) filter.brand = brand;

    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid product ID format' });
    }
    res.status(500).json({ message: error.message });
  }
});

// Auth middleware
const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

// Admin middleware
const admin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    if (user && user.role === 'admin') {
      next();
    } else {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }
  } catch (err) {
    return res.status(500).json({ message: 'Server error checking admin role' });
  }
};

// Add product (admin only)
router.post('/', auth, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      originalPrice,
      gender,
      category,
      occasion,
      inspiredBy,
      image,
      stock
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !description ||
      price === undefined ||
      !originalPrice ||
      !gender ||
      !category ||
      !occasion ||
      !inspiredBy ||
      !image ||
      stock === undefined
    ) {
      return res.status(400).json({ message: 'All product fields are required' });
    }

    const product = new Product({
      name,
      description,
      price,
      originalPrice,
      gender,
      category,
      occasion,
      inspiredBy,
      image,
      stock
    });

    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Server error creating product' });
  }
});

// Update product (admin only)
router.put('/:id', auth, admin, async (req, res) => {
  try {
    const { name, price, description, category, image } = req.body;
    const updates = { name, price, description, category, image };

    // Remove undefined fields from updates
    Object.keys(updates).forEach(key => updates[key] === undefined && delete updates[key]);

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Server error updating product' });
  }
});

// Delete product (admin only)
router.delete('/:id', auth, admin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting product' });
  }
});
module.exports = router;