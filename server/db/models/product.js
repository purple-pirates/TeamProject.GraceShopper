// IMPORTS & MODULES
const Sequelize = require('sequelize')
const db = require('../db')

// PRODUCTS MODEL

const Product = db.define('product', {})

// EXPORT

module.exports = Product
