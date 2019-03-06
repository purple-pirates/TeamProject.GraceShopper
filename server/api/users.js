const router = require('express').Router()
const {User, Order, Product} = require('../db/models')
const {isLoggedIn, isSelfOrAdmin, isAdmin} = require('./security')

// GET Route for /api/users

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// GET Route for /api/users/:userId

router.get('/:userId', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findById(req.params.userId)
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// GET Route for /api/users/orders

router.get('/account/orders', isSelfOrAdmin, (req, res, next) => {
  User.findById(req.user.id)
    .then(user => {
      return Order.findAll({
        where: {
          userId: req.user.id
        },
        include: [
          {
            model: Product
          }
        ]
      })
    })
    .then(orders => {
      res.json(orders)
    })
    .catch(next)
})

// PUT Route for /api/users/:userId
router.put('/:userId', isSelfOrAdmin, (req, res, next) => {
  const userId = req.params.userId
  const updateUser = req.body
  User.update(
    {
      firstName: updateUser.firstName,
      lastName: updateUser.lastName,
      email: updateUser.email,
      password: updateUser.password,
      street: updateUser.street,
      city: updateUser.city,
      state: updateUser.state,
      zip: updateUser.zip,
      phone: updateUser.phone,
      imageUrl: updateUser.imageUrl
    },
    {
      where: {id: userId},
      returning: true,
      plain: true
    }
  )
    .then(() =>
      User.findAll({
        where: {id: userId}
      })
    )
    .then(user => {
      return res.json(user[0])
    })
    .catch(next)
})

// DELETE Route for /api/users/:userId
router.delete('/:userId', isSelfOrAdmin, (req, res, next) => {
  const userId = this.params.userId
  User.destroy({
    where: {id: userId}
  })
    .then(user => res.json(user))
    .then(() => res.status(204).end())
    .catch(next)
})

// POST Route for /api/users/signup
router.post('/signup', (req, res, next) => {
  const newUser = req.body
  User.create({
    firstName: newUser.firstName || 'jello',
    lastName: newUser.lastName,
    email: newUser.email,
    password: newUser.password,
    street: newUser.street,
    city: newUser.city,
    state: newUser.state,
    zip: newUser.zip,
    phone: newUser.phone,
    imageUrl: newUser.imageUrl
  })
    .then(user => res.json(user))
    .catch(next)
})

module.exports = router
