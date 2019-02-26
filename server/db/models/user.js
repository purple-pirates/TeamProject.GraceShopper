// IMPORTS & MODULES
const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

// USER MODEL

const User = db.define('user', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('password')
    }
  },
  salt: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('salt')
    }
  },
  googleId: {
    type: Sequelize.STRING
  },
  street: Sequelize.STRING,
  city: Sequelize.STRING,
  state: Sequelize.STRING,
  zip: {
    type: Sequelize.INTEGER,
    validate: {
      isInt: true,
      len: 5
    }
  },
  phone: {
    type: Sequelize.INTERGER,
    validate: {
      len: [10]
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    },
    defaultValue: '../../../public/images/defaultUser.png'
  }
})

// INSTANCE METHODS

User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

// CLASS METHODS

User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

// HOOKS

const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
User.beforeBulkCreate(users => {
  users.forEach(setSaltAndPassword)
})

// EXPORT

module.exports = User
