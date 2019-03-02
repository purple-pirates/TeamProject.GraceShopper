const router = require('express').Router()

const {Cart, Product} = require('../db/models')

// GET Route for /api/cart

router.get('/', async (req, res, next) => {
  try {
    if (req.session.passport === undefined) {
      res.send([{quantity: 'The user is not logged in'}])
    } else {
      const userId = req.session.passport.user
      const cart = await Cart.findAll({
        where: {
          userId
        }
        // include: [{model: Product}]
      })
      res.json(cart)
    }
  } catch (err) {
    next(err)
  }
})

// POST: api/cart
router.post('/:productId', async (req, res, next) => {
  try {
    const userId = req.session.passport.user
    const productId = req.params.productId
    console.log('we in here', req.body, userId, productId)
    let body = {...req.body, userId: userId, productId: productId}
    await Cart.create(body)
    // res.status(204).send('Added to cart')
  } catch (error) {
    next(error)
  }
})

module.exports = router
