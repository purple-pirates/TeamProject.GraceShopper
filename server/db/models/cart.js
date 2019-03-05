// IMPORTS & MODULES
const Sequelize = require('sequelize')
const db = require('../db')

// CART MODEL

const Cart = db.define('cart', {
  name: {
    type: Sequelize.STRING
  },
  quantity: {
    type: Sequelize.SMALLINT
  },
  size: {
    type: Sequelize.ENUM('Small', 'Medium', 'Large', 'Extra Large', 'XX Large')
  }
})

// EXPORT

module.exports = Cart
