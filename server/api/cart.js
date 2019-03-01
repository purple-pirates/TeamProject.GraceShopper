const router = require('express').Router()

const {Cart} = require('../db/models')

// POST: api/cart
router.post('/', async (req, res, next) => {
  try {
    await Cart.create(req.body)
    res.status(204).send('Added to cart')
  } catch (error) {
    next(error)
  }
})

module.exports = router
