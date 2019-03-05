const router = require('express').Router()
const {Product} = require('../db/models')

function orderTotal(products) {
  let total
  products.forEach(product => {
    total += product.price * product.quantity
  })
  return total
}

router.get('/', (req, res, next) => {
  if (!req.session.cart) req.session.cart = {products: [], total: 0}
  res.json(req.session.cart)
})

router.put('/', (req, res, next) => {
  if (!req.session.cart) req.session.cart = {products: [], total: 0}
  let found = false
  for (let i = 0; i < req.session.cart.products.length; i++) {
    if (req.body.id === req.session.cart.products[i].id) {
      if (req.body.quantity) {
        const oldQuantity = req.session.cart.products[i].quantity
        req.session.cart.products[i].quantity += req.body.quantity - oldQuantity
        if (req.session.cart.products[i].quantity === 0) {
          req.session.cart.products.splice(i, 1)
        }
      } else {
        req.session.cart.products[i].quantity++
      }
      req.session.cart.total = orderTotal(req.session.cart.products)
      res.json(req.session.cart)
      found = true
      break
    }
  }
  if (found === false) {
    Product.findById(req.body.id)
      .then(product => {
        req.session.cart.products.push({
          id: product.id,
          name: product.name,
          category: product.category,
          description: product.description,
          price: product.price,
          inventory: product.inventory,
          ratingsTotal: product.ratingsTotal,
          images: product.images,
          quantity: 1
        })
        req.session.cart.total += product.price
        res.json(req.session.cart)
      })
      .catch(next)
  }
})

router.delete('/:productId', (req, res, next) => {
  req.session.cart.products = req.session.cart.products.filter(
    product => product.id !== +req.params.productId
  )
  req.session.cart.total = orderTotal(req.session.cart.products)
  res.json(req.session.cart)
})

module.exports = router
