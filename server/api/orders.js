const router = require('express').Router()
const {Product, Order} = require('../db/models')

router.post('/', (req, res, next) => {
  Order.create({
    userId: req.user && req.user.id,
    email: req.body.email,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip
  })
    .then(order => {
      return req.session.cart.products.map(product => {
        return Product.findById(product.id).then(foundProduct =>
          order.addProductToOrder(foundProduct, product.quantity)
        )
      })
    })
    .catch(next)
})

module.exports = router
