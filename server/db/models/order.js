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
    type: Sequelize.STRING,
    allowNull: false
  },
  recipientStreet: {
    type: Sequelize.STRING,
    allowNull: false
  },
  recipientCity: {
    type: Sequelize.STRING,
    allowNull: false
  },
  recipientState: {
    type: Sequelize.STRING,
    allowNull: false
  },
  recipientZip: {
    type: Sequelize.STRING,
    allowNull: false
  },
  customerPhone: {
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
