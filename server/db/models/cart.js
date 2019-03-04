// MODULES & IMPORTS

const Sequelize = require('sequelize')
const db = require('../db')

// CART MODEL

const Cart = db.define('cart', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      min: 1
    }
  },
  price: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
    validate: {
      min: 0
    },
    get() {
      return this.priceInDollars(this.getDataValue('price'))
    }
  }
})

// PROTOTYPE METHODS

Cart.prototype.priceInDollars = price => {
  return `$${price / 100}`
}

/*
I think there is a better way to get the total, by making use of instance methods and involving the cart through table.
*/

// EXPORT

module.exports = Cart
