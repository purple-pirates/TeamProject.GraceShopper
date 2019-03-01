// IMPORTS & MODULES
const Sequelize = require('sequelize')
const db = require('../db')

// PRODUCTS MODEL

const Product = db.define(
  'product',
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    price: {
      type: Sequelize.INTEGER, // Stored in cents.
      allowNull: false,
      get() {
        return this.priceInDollars(this.getDataValue('price'))
      }
    },
    imageUrl: {
      type: Sequelize.STRING,
      defaultValue: '/images/blackHoodie.jpg'
    },
    description: {
      type: Sequelize.TEXT,
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
  },
  {
    defaultScope: {
      attributes: ['id', 'name', 'price', 'description', 'imageUrl', 'size']
    }
  }
)

// PROTOTYPE METHOD

Product.prototype.priceInDollars = price => {
  return `$${price / 100}`
}

// EXPORT

module.exports = Product
