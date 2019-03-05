// IMPORTS & MODULES

const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

// USER MODEL

const User = db.define('user', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  isAdmin: {
    //NOTE: For the admin panel streth goal.
    type: Sequelize.BOOLEAN,
    defaultValue: false
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
  twitterId: {
    type: Sequelize.STRING
  },
  facebookId: {
    type: Sequelize.STRING
  },
  street: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING
  },
  state: {
    type: Sequelize.STRING
  },
  zip: {
    type: Sequelize.STRING
  },
  phone: {
    type: Sequelize.STRING
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://s3.amazonaws.com/purple-pirate-pompadours/default-user.svg'
  }
})

// INSTANCE METHODS

User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

User.prototype.displayFullName = function() {
  return `${this.firstName} ${this.lastName}`
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
