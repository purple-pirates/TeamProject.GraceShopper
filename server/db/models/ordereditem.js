// MODULES & IMPORTS

const Sequelize = require('sequelize')
const db = require('../db')

// ORDERITEMS MODEL

const OrderedItem = db.define('ordereditem', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      min: 1
    }
  },
  subTotal: {
    type: Sequelize.INTEGER, // Stored as cents.
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

OrderedItem.prototype.priceInDollars = price => {
  return '$' + price / 100
}

// EXPORT

module.exports = OrderedItem
