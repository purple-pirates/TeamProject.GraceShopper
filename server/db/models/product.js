// IMPORTS & MODULES
const Sequelize = require('sequelize')
const db = require('../db')

// PRODUCTS MODEL

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '../../../public/images/blackHoodie.png'
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: 'Buy this product!'
  },
  size: {
    type: Sequelize.ENUM('S', 'M', 'L', 'XL', 'XXL'),
    defaultValue: 'M'
  },
  merchant: {
    type: Sequelize.STRING,
    default: 'Misfit'
  },
  quantity: Sequelize.INTEGER
})

// EXPORT

module.exports = Product
