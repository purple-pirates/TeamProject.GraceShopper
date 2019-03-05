// IMPORTS & MODULES

const Sequelize = require('sequelize')
const db = require('../db')

// REVIEWS MODEL

const Review = db.define('reviews', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  text: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      validateLength: function(text) {
        if (text.length < 20) {
          throw new Error('Your review is not long enough.')
        }
      }
    }
  }
})

// EXPORT

module.exports = Review
