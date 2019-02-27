const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

// GET Route for /api/users

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// GET Route for /api/users/:userId
router.get('/:userId', async (req, res, next) => {
  try {
    const users = await User.findById(req.params.userId, {
      attributes: [
        'firstName',
        'lastName',
        'email',
        'street',
        'city',
        'state',
        'zip',
        'phone',
        'imageUrl'
      ]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
