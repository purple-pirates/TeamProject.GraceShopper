/* eslint-disable complexity */
const router = require('express').Router()

const {Cart, Product} = require('../db/models')

// GET Route for /api/cart

router.get('/', async (req, res, next) => {
  try {
    // res.send(req.session.cartItems)
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
// eslint-disable-next-line complexity
// eslint-disable-next-line max-statements
router.post('/:productId', async (req, res, next) => {
  try {
    // const userId = req.session.passport.user
    const productId = req.params.productId
    // req.session.cartItems = []

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
      console.log('this is req.session.cartItems', req.session.cartItems)
      res.status(204).send(req.session.cartItems)
    } else {
      // if(req.session.cartItems){

      // }
      const userId = req.session.passport.user
      console.log('userid', req.session.passport.user)
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

      // Cart.update({where: {userId}})
      // const cartItem = req.session.cartItems
      let found = false
      let newQuantity
      console.log('...', req.body.id, req.body.size, req.body.quantity)
      for (let x = 0; x < cartItem.length; x++) {
        console.log(cartItem[x].dataValues)
        if (
          cartItem[x].dataValues.productId === req.body.id &&
          cartItem[x].dataValues.size === req.body.size
        ) {
          console.log('SAME ITEM')
          found = true
          newQuantity =
            cartItem[x].dataValues.quantity + Number(req.body.quantity)

          await Cart.update(
            {quantity: newQuantity},
            {
              where: {
                size: req.body.size,
                name: req.body.name,
                userId: userId,
                productId: productId
              },
              returning: true,
              plain: true
            }
          )
          break
        }
      }
      if (!found) {
        // req.session.cartItems.push(req.body)
        await Cart.create(body)
      }

      // const [instance, wasCreated] = await Cart.findOrCreate({
      //   where: {
      //     name: req.body.name,
      //     size: req.body.size,
      //     quantity: req.body.quantity,
      //     userId: userId,
      //     productId: productId
      //   }
      // })
      res.send()
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
