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
    type: Sequelize.INTEGER,
    allowNull: false,
    get() {
      return this.priceInDollars(this.getDataValue('price'))
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isUrl: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: 'More information has not been provided by the vendor.',
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  size: {
    type: Sequelize.STRING,
    defaultValue: 'M',
    validate: {
      notEmpty: true
    }
  },
  stock: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  totalStars: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    defaultValue: [0, 0, 0, 0, 0]
  }
})

//INSTANCE METHODS

// Product.averageRating = function() {
//   return this.totalStars.reduce((val, idx) => {
//     return val * (idx + 1)
//   }, 0)
// }

// PROTOTYPE METHODS

Product.prototype.priceInDollars = price => {
  return '$' + price / 100
}

Product.prototype.decrementStock = function(num) {
  this.stock = Math.max(this.stock - num, 0)
}

// EXPORT

module.exports = Product
