const router = require('express').Router()
const {Product, Reviews} = require('../db/models')
module.exports = router

// GET Route for /api/products

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: ['id', 'name', 'price', 'description', 'imageUrl', 'size']
    })
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
