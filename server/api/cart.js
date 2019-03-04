const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  if (!req.session.cart) req.session.cart = {products: [], total: 0}
  res.json(req.session.cart)
})

router.put('/', (req, res, next) => {
  if (!req.session.cart) req.session.cart = {items: [], total: 0}
  let found = false
  for (let i = 0; i < req.session.cart.items.length; i++) {
    if (req.body.id === req.session.cart.items[i].id) {
      if (req.body.quantity) {
        const oldQuantity = req.session.cart.items[i].quantity
        req.session.cart.items[i].quantity += req.body.quantity - oldQuantity
        if (req.session.cart.items[i].quantity === 0) {
          req.session.cart.items.splice(i, 1)
        }
      } else {
        req.session.cart.items[i].quantity++
      }
      req.session.cart.total = getOrderTotal(req.session.cart.items)
      res.json(req.session.cart)
      found = true
      break
    }
  }
  if (found === false) {
    Product.findById(req.body.id)
      .then(product => {
        req.session.cart.items.push({
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          quantity: 1
        })
        req.session.cart.total += product.price
        res.json(req.session.cart)
      })
      .catch(next)
  }
})

function getOrderTotal(items) {
  let total = 0
  items.forEach(item => {
    total += item.price * item.quantity
  })
  return total
}
