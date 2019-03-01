const User = require('./user')
const Product = require('./product')
const Cart = require('./cart')
const Reviews = require('./review')
// const db = require('../db')
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

Reviews.belongsTo(User)
Reviews.belongsTo(Product)
Product.hasMany(Reviews)

User.belongsToMany(Product, {
  as: 'Purchases',
  through: Cart,
  foreignKey: 'userId'
})
Product.belongsToMany(User, {
  as: 'Customer',
  through: Cart,
  foreignKey: 'productId'
})

// //Add additional fields here
// const Cart = db.model('cart')

module.exports = {
  User,
  Product,
  Reviews,
  Cart
}
