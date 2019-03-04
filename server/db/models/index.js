const User = require('./user')
const Product = require('./product')
const Reviews = require('./review')

Reviews.belongsTo(User)
Reviews.belongsTo(Product)
Product.hasMany(Reviews)

module.exports = {
  User,
  Product,
  Reviews
}
