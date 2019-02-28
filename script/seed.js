'use strict'

const db = require('../server/db')
const {User, Product} = require('../server/db/models')

const users = [
  {
    firstName: 'Alice',
    lastName: 'Wonderland',
    email: 'alice@email.com',
    password: 'password'
  },
  {
    firstName: 'Marshall',
    lastName: 'Mathers',
    email: 'marshall@email.com',
    password: 'password'
  },
  {
    firstName: 'Steve',
    lastName: 'Nojob',
    email: 'steve@email.com',
    password: 'password'
  },
  {
    firstName: 'Kanye',
    lastName: 'East',
    email: 'kanye@email.com',
    phone: '1999999999',
    password: 'password'
  },
  {
    firstName: 'Lady',
    lastName: 'Haha',
    email: 'lady@email.com',
    phone: '1234567890',
    password: 'password'
  },
  {
    firstName: 'Buy-Ny',
    lastName: 'The-Stuff-Guy',
    email: 'buyny@email.com',
    password: 'password'
  }
]

const products = [
  {
    name: 'The Black Hoodie',
    price: 4495,
    description: 'This is a black hoodie. The best black hoodie ever created.',
    size: 'L',
    merchant: 'misfit merch',
    quantity: 100
  },
  {
    name: 'The Grey Hoodie',
    price: 4095,
    description: 'This is a grey hoodie. The best grey hoodie ever created.',
    size: 'M',
    merchant: 'misfit merch',
    quantity: 100
  },
  {
    name: 'The Burgundy Hoodie',
    price: 4295,
    description:
      'This is a burgundy hoodie. The best burgundy hoodie ever created.',
    size: 'XL',
    merchant: 'misfit merch',
    quantity: 100
  },
  {
    name: 'The Red Hoodie',
    price: 3495,
    description: 'This is a red hoodie. The best red hoodie ever created.',
    size: 'XXL',
    merchant: 'misfit merch',
    quantity: 100
  },
  {
    name: 'The Navy Hoodie',
    price: 3495,
    description: 'This is a navy hoodie. The best navy hoodie ever created.',
    size: 'S',
    merchant: 'misfit merch',
    quantity: 100
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const userData = await Promise.all(users.map(user => User.create(user)))

  const productData = await Promise.all(
    products.map(product => Product.create(product))
  )

  console.log(`seeded ${userData.length} users`)
  console.log(`seeded ${productData.length} products`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
