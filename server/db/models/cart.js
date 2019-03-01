// IMPORTS & MODULES
const Sequelize = require('sequelize')
const db = require('../db')

// CART MODEL

const Cart = db.define('cart', {
  testCol: {
    type: Sequelize.STRING
  }
})

// EXPORT

module.exports = Cart
