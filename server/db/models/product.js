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
      defaultValue:
        'https://s3.amazonaws.com/purple-pirate-pompadours/Hoodies/BlackHoodie.jpg',
      validate: {
        isUrl: true
      }
    },
    tags: {
      type: Sequelize.ARRAY(Sequelize.STRING)
    },
    description: {
      type: Sequelize.TEXT,
      defaultValue: 'More information has not been provided by the vendor.',
      validate: {
        notEmpty: true
      }
    },
    size: {
      // NOTE: Consider that we'd have specific stock for specific sizes; may need an associated table.
      type: Sequelize.ENUM('S', 'M', 'L', 'XL', 'XXL'),
      defaultValue: 'M'
    },
    merchant: {
      type: Sequelize.STRING,
      default: 'Misfit'
    },
    stock: {
      // NOTE: Consider a way to reserve an item for someone whose cart is not submitted. Reservation?
      type: Sequelize.INTEGER,
      allowNull: false,
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
  },
  {
    defaultScope: {
      attributes: [
        'id',
        'name',
        'price',
        'description',
        'imageUrl',
        'size',
        'merchant'
      ]
    }
  }
)

//INSTANCE METHODS

Product.incrementRating = function(num) {
  const oldTotal = this.getDataValue('totalStars')
  oldTotal[num - 1]++
  this.setDataValue('totalStars', oldTotal)
}

Product.averageRating = function() {
  return this.totalStars.reduce((val, idx) => {
    return val * (idx + 1)
  }, 0)
}

// PROTOTYPE METHODS

Product.prototype.priceInDollars = price => {
  return `$${price / 100}`
}

Product.prototype.decrementStock = function(num) {
  this.stock = Math.max(this.stock - num, 0)
  // NOTE: Consider a message alert for when stock empty; item should be hidden on storefront.
}

// EXPORT

module.exports = Product
