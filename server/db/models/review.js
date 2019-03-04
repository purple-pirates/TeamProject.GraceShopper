// IMPORTS & MODULES
const Sequelize = require('sequelize')
const db = require('../db')

// REVIEWS MODEL

const Reviews = db.define('review', {
  review: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

// EXPORT

module.exports = Reviews
