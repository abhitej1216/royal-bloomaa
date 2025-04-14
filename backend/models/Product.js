const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  originalPrice: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Perfumes', 'Attars', 'Body Mists', 'Gift Sets']
  },
  occasion: {
    type: String,
    required: true,
    enum: ['Casual', 'Business', 'Evening', 'Special Occasion']
  },
  image: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema); 