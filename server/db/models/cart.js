// IMPORTS & MODULES
const Sequelize = require('sequelize')
const db = require('../db')

// CART MODEL

const Cart = db.define('cart', {
  quantity: {
    type: Sequelize.SMALLINT
  },
  size: {
    type: Sequelize.ENUM('S', 'M', 'L', 'XL', 'XXL')
  }
})

// EXPORT

module.exports = Cart
