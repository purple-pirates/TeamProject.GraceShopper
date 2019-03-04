/* eslint-disable complexity */
const router = require('express').Router()

const {Cart, Product} = require('../db/models')

// GET Route for /api/cart
router.get('/', async (req, res, next) => {
  try {
    if (req.session.passport === undefined) {
      res.send(req.session.cartItems)
    } else {
      const userId = req.session.passport.user
      const cart = await Cart.findAll({
        where: {
          userId
        }
      })
      res.json(cart)
    }
  } catch (err) {
    next(err)
  }
})

// POST: api/cart
// eslint-disable-next-line max-statements
router.post('/:productId', async (req, res, next) => {
  let found = false
  try {
    const productId = req.params.productId
    if (req.session.passport === undefined) {
      if (req.session.cartItems === undefined) {
        req.session.cartItems = [req.body]
      } else if (req.session.cartItems) {
        const cartItem = req.session.cartItems

        for (let x = 0; x < cartItem.length; x++) {
          if (
            cartItem[x].id === req.body.id &&
            cartItem[x].size === req.body.size
          ) {
            found = true
            cartItem[x].quantity =
              Number(cartItem[x].quantity) + Number(req.body.quantity)
            break
          }
        }
        if (!found) {
          req.session.cartItems.push(req.body)
        }
      }
      res.status(204).send(req.session.cartItems)
    } else {
      const userId = req.session.passport.user
      let body = {
        size: req.body.size,
        quantity: req.body.quantity,
        name: req.body.name,
        userId: userId,
        productId: productId
      }
      const cartItem = await Cart.findAll({
        where: {
          userId
        }
      })
      let newQuantity

      for (let x = 0; x < cartItem.length; x++) {
        if (cartItem[x].dataValues.productId === req.body.id) {
          found = true
          newQuantity =
            cartItem[x].dataValues.quantity + Number(req.body.quantity)

          await Cart.update(
            {quantity: newQuantity},
            {
              where: {
                size: req.body.size,
                name: req.body.name,
                userId,
                productId
              },
              returning: true,
              plain: true
            }
          )
          break
        }
      }
      if (!found) {
        await Cart.create(body)
      }

      res.send()
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:productId', async (req, res, next) => {
  await Cart.update(
    {quantity: 3},
    {
      where: {
        userId: req.session.passport.user,
        productId: req.params.productId
      }
    }
  )
  res.end()
})

router.delete('/:productId', async (req, res, next) => {
  await Cart.destroy({
    where: {
      userId: req.session.passport.user,
      productId: req.params.productId
    }
  })
  res.end()
})

module.exports = router
