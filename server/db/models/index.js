// MODULES & IMPORTS

const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const OrderedItem = require('./ordereditem')
const Review = require('./review')

//ASSOCIATIONS

Order.belongsTo(User)
User.hasMany(Order)

Order.belongsToMany(Product, {through: OrderedItem})
Product.belongsToMany(Order, {through: OrderedItem})

Review.belongsTo(Product)
Product.hasMany(Review)

Review.belongsTo(User)
User.hasMany(Review)

// EXPORT

module.exports = {
  User,
  Product,
  Order,
  OrderedItem,
  Review
}
