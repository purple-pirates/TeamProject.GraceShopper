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
    type: Sequelize.INTEGER, // Stored in cents.
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
    // NOTE: Consider that we'd have specific stock for specific sizes; may need an associated table.
    type: Sequelize.STRING,
    defaultValue: 'M'
  },
  stock: {
    // NOTE: Consider a way to reserve an item for someone whose cart is not submitted. Reservation?
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  totalStars: {
    //NOTE: Total ratings for each star, i.e. 1 star, 2 stars, 3 stars, etc.
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    defaultValue: [0, 0, 0, 0, 0]
  }
})

//INSTANCE METHODS

Product.averageRating = function() {
  return this.totalStars.reduce((val, idx) => {
    return val * (idx + 1)
  }, 0)
}

// PROTOTYPE METHODS

Product.prototype.priceInDollars = price => {
  return '$' + price / 100
}

Product.prototype.decrementStock = function(num) {
  this.stock = Math.max(this.stock - num, 0)
  // NOTE: Consider a message alert for when stock empty; item should be hidden on storefront.
}

// EXPORT

module.exports = Product
