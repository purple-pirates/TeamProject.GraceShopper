const router = require('express').Router()

const {Cart} = require('../db/models')

// GET Route for /api/cart

router.get('/', async (req, res, next) => {
  try {
    const userId = req.session.passport.user
    const cart = await Cart.findAll({
      where: {
        userId
      }
    })
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

// POST: api/cart
router.post('/:productId', async (req, res, next) => {
  try {
    await Cart.create(req.body)
    res.status(204).send('Added to cart')
  } catch (error) {
    next(error)
  }
})

module.exports = router
