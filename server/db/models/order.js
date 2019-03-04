// IMPORTS & MODULES
const Sequelize = require('sequelize')
const db = require('../db')
// const Cart = require ('./cart');

// ORDERS MODEL

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM(
      'Pending',
      'Cancelled',
      'Processing',
      'Shipping',
      'Completed'
    ),
    defaultValue: 'Pending',
    allowNull: false
  },
  items: {
    //NOTE: Created as an array for now, would consider different approach later.
    type: Sequelize.ARRAY(Sequelize.JSON),
    allowNull: false
  },
  orderDate: {
    type: Sequelize.DATE,
    noUpdate: true,
    allowNull: false
  },
  subTotal: {
    type: Sequelize.VIRTUAL,
    get: function() {
      if (this.items && this.items.length)
        return this.items
          .map(item => item.quantity * item.price)
          .reduce((a, b) => a + b, 0)
      else {
        return 0
      }
    }
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
    type: Sequelize.STRING,
    allowNull: false
  },
  gift: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  specialInstructions: {
    type: Sequelize.TEXT
  }
})

// EXPORT

module.exports = Order
