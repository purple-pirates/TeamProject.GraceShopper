// MODULES & IMPORTS

const User = require('./user')
const Product = require('./product')
const Order = require('./order')
// const Cart = require('./cart');
const Review = require('./review')

//ASSOCIATIONS

Order.belongsTo(User)
User.hasMany(Order)

// Order.belongsToMany(Product, { through: Cart });
// Product.belongsToMany(Order, { through: Cart });

Review.belongsTo(Product)
Product.hasMany(Review)

Review.belongsTo(User)
User.hasMany(Review)

// EXPORT

module.exports = {
  User,
  Product,
  Order,
  Review
}
