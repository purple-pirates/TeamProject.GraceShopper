const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

// GET Route for /api/users

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// GET Route for /api/users/:userId

router.get('/:userId', async (req, res, next) => {
  try {
    const users = await User.findById(req.params.userId)
    res.json(users)
  } catch (err) {
    next(err)
  }
})
