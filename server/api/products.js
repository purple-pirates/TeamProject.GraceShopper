const router = require('express').Router()
const {Product} = require('../db/models')
const {isAdmin} = require('./security')

// GET Route for /api/products

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

// GET Route for /api/products/:productId
router.get('/:productId', async (req, res, next) => {
  try {
    const products = await Product.findById(req.params.productId)
    res.json(products)
  } catch (err) {
    next(err)
  }
})

module.exports = router
