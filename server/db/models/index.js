// MODULES & IMPORTS

const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const OrderedItem = require('./ordereditem')
const Review = require('./review')
const Cart = require('./cart')

//ASSOCIATIONS

Order.belongsTo(User)
User.hasMany(Order)

Order.belongsToMany(Product, {through: OrderedItem})
Product.belongsToMany(Order, {through: OrderedItem})

Review.belongsTo(Product)
Product.hasMany(Review)

Review.belongsTo(User)
User.hasMany(Review)

User.belongsToMany(Product, {
  through: Cart
})
Product.belongsToMany(User, {
  through: Cart
})

// EXPORT

// //Add additional fields here
// const Cart = db.model('cart')

module.exports = {
  User,
  Product,
  Order,
  OrderedItem,
  Review,
  Cart
}
