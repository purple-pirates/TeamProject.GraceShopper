// IMPORTS & MODULES

const Sequelize = require('sequelize')
const db = require('../db')

// ORDERS MODEL

const Order = db.define('order', {
  status: {
    type: Sequelize.STRING,
    defaultValue: 'Pending',
    allowNull: false
  },
  dateOrdered: {
    type: Sequelize.DATE,
    allowNull: false
  },
  recipientName: {
    // NOTE: Should default to user's full name.
    type: Sequelize.STRING,
    allowNull: false
  },
  recipientStreet: {
    // NOTE: Should default to user's street address.
    type: Sequelize.STRING,
    allowNull: false
  },
  recipientCity: {
    // NOTE: Should default to user's city.
    type: Sequelize.STRING,
    allowNull: false
  },
  recipientState: {
    // NOTE: Should default to user's state.
    type: Sequelize.STRING,
    allowNull: false
  },
  recipientZip: {
    // NOTE: Should default to user's zip.
    type: Sequelize.STRING,
    allowNull: false
  },
  customerPhone: {
    /*
      NOTE: Should default to user's phone, will always be the phone number of the customer making the purchase.
      */
    type: Sequelize.STRING
  },
  gift: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  specialInstructions: {
    type: Sequelize.TEXT
  },
  total: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
    get() {
      return this.priceInDollars(this.getDataValue('total'))
    }
  }
})

// PROTOTYPE METHODS

Order.prototype.priceInDollars = price => {
  return '$' + price / 100
}

// EXPORT

module.exports = Order
