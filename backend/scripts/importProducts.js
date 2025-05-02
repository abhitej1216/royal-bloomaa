const mongoose = require('mongoose');
const fs = require('fs');
const Product = require('../models/Product');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const importProducts = async () => {
  try {
    // Read the JSON file
    const products = JSON.parse(fs.readFileSync('./data/products.json', 'utf-8'));
    
    // Delete existing products
    await Product.deleteMany({});
    
    // Insert new products
    await Product.insertMany(products);
    
    console.log('Products imported successfully');
    process.exit();
  } catch (error) {
    console.error('Error importing products:', error);
    process.exit(1);
  }
};

importProducts();