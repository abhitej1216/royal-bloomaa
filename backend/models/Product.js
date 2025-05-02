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
    type: Number,  // Changed from Number to String
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['Men', 'Women', 'Unisex']
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
  inspiredBy: {
    type: String,
    required: true
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
  }
});

module.exports = mongoose.model('Product', productSchema);