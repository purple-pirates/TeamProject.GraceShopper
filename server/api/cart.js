/* eslint-disable complexity */
const router = require('express').Router()
const stripe = require('stripe')(process.env.STRIPE_KEY)

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

router.post('/charge', async (req, res) => {
  try {
    let {status} = await stripe.charges.create({
      amount: 4000,
      currency: 'usd',
      description: 'Hoodie',
      source: req.body
    })
    res.json({status})
  } catch (err) {
    res.status(500).end()
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
      console.log('THIS IS BEFORE THE CART ITEM &&&&&&&&&')
      const cartItem = await Cart.findAll({
        where: {
          userId
        }
      })
      console.log('Cart Item: ', cartItem)
      let newQuantity
      let body = {
        size: req.body.size,
        quantity: req.body.quantity,
        name: req.body.name,
        userId: userId,
        productId: productId
      }

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
  try {
    const change = req.body.change === 'up' ? 1 : -1
    if (req.session.passport === undefined) {
      const cartItem = req.session.cartItems
      for (let x = 0; x < cartItem.length; x++) {
        if (cartItem[x].name === req.body.name) {
          cartItem[x].quantity = Number(cartItem[x].quantity) + change
          break
        }
      }
      res.send({cartItem})
    } else {
      await Cart.update(
        {quantity: req.body.quantity + change},
        {
          where: {
            userId: req.body.userId,
            productId: req.params.productId
          }
        }
      )
      res.send({user: req.session.passport})
    }
  } catch (e) {
    next(e)
  }
})

router.delete('/:productId', async (req, res, next) => {
  try {
    if (req.session.passport === undefined) {
      const cartItem = req.session.cartItems
      for (let x = 0; x < cartItem.length; x++) {
        if (cartItem[x].name === req.body.name) {
          cartItem.splice(x, 1)
          break
        }
      }

      res.send({cartItem})
    } else {
      await Cart.destroy({
        where: {
          productId: req.params.productId
        }
      })
      res.send({user: req.session.passport})
    }
  } catch (e) {
    next(e)
  }
})

router.post('/charge', async (req, res) => {
  try {
    let {status} = await stripe.charges.create({
      amount: 40000,
      currency: 'usd',
      description: 'Hoodie',
      source: req.body
    })
    res.json({status})
  } catch (err) {
    res.status(500).end()
  }
})

module.exports = router
