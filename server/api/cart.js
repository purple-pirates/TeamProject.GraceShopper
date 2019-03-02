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
        // include: [{model: Product}]
      })
      res.json(cart)
    }
  } catch (err) {
    next(err)
  }
})

// POST: api/cart
// eslint-disable-next-line complexity
router.post('/:productId', async (req, res, next) => {
  try {
    // const userId = req.session.passport.user
    const productId = req.params.productId

    if (req.session.passport === undefined) {
      // res.send([{quantity: 'The user is not logged in'}])
      if (req.session.cartItems === undefined) {
        req.session.cartItems = [req.body]
      } else if (req.session.cartItems) {
        const cartItem = req.session.cartItems
        let found = false
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

      // req.session.cartItems.push(req.body)

      console.log('this is req.session.cartItems', req.session.cartItems)
    } else {
      // let body = {
      //   size: req.body.size,
      //   quantity: req.body.quantity,
      //   name: req.body.name,
      //   userId: userId,
      //   productId: productId
      // }
      // const [instance, wasCreated] = await Cart.findOrCreate({
      //   where: {
      //     name: req.body.name,
      //     size: req.body.size,
      //     quantity: req.body.quantity,
      //     userId: userId,
      //     productId: productId
      //   }
      // })
    }
    res.status(204).send(req.session.cartItems)
  } catch (error) {
    next(error)
  }
})

module.exports = router
