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
  reviewText: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      validateLength: function(text) {
        if (text.length < 20) {
          throw new Error('Your review is not long enough!')
        }
        if (text.length > 8000) {
          throw new Error('Your reviw is too long!')
        }
      }
    }
  },
  stars: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 5
    }
  }
})

// EXPORT

module.exports = Review
