'use strict'

const db = require('../server/db')
const {User, Product} = require('../server/db/models')

const users = [
  {
    firstName: 'Alice',
    lastName: 'Wonderland',
    email: 'alice@email.com',
    isAdmin: false,
    password: 'password',
    street: '5 Street St.',
    city: 'Newark',
    state: 'New Jersey',
    zip: '01234-5678',
    phone: '1-222-555-6767'
  },
  {
    firstName: 'Brendon',
    lastName: 'Brennan',
    email: 'bbrennan@email.com',
    isAdmin: false,
    password: 'password',
    street: '10 Place Pl.',
    city: 'New York',
    state: 'NY',
    zip: '11111-0000',
    phone: '1-222-555-2323'
  },
  {
    firstName: 'Steve',
    lastName: 'Nojob',
    email: 'iDied@email.com',
    isAdmin: false,
    password: 'password',
    street: '20 Avenue Ave.',
    city: 'New York',
    state: 'NY',
    zip: '11111-1111',
    phone: '1-222-555-6767'
  },
  {
    firstName: 'Plissken',
    lastName: 'MacReady',
    email: 'plissken.macready@gmail.com',
    isAdmin: false,
    password: 'P1155k3nM4cr34dy',
    street: 'All Streets',
    city: 'Reality',
    state: 'NO',
    zip: '00000-0000',
    phone: '1-222-555-6767'
  },
  {
    firstName: 'Gregory',
    lastName: 'Ardison-Gardner',
    email: 'greg.ardison.gardner@gmail.com',
    isAdmin: true,
    password: 'L3f7H4nd0fD4rkn355',
    street: '107 Prospect Avenue',
    city: 'Lynbrook',
    state: 'NY',
    zip: '11563',
    phone: '1-516-947-4347'
  },
  {
    firstName: 'Buy-ny',
    lastName: 'The-Stuff-Guy',
    email: 'buy-ny@email.com',
    isAdmin: false,
    password: 'password',
    street: '1 Road Rd.',
    city: 'New York',
    state: 'NY',
    zip: '11122-2232',
    phone: '1-222-555-0009'
  }
]

const products = [
  {
    name: 'The Original',
    price: 1999,
    imageUrl:
      'https://s3.amazonaws.com/purple-pirate-pompadours/Hoodies/BlackHoodie.jpg',
    description:
      "You can have this hoodie in any color you'd like as long as long it's black."
  },
  {
    name: 'The Borealis',
    price: 3999,
    imageUrl:
      'https://s3.amazonaws.com/purple-pirate-pompadours/Hoodies/Borealis.jpg',
    description:
      'Aurora borealis - at this time of year, in this part of the country, localized entirely upon your hoodie.'
  },
  {
    name: 'The Starry Night',
    price: 5999,
    imageUrl:
      'https://s3.amazonaws.com/purple-pirate-pompadours/Hoodies/StarryNight.jpg',
    description:
      "Every child is an artist. The problem is that they don't have this hoodie."
  },
  {
    name: 'The Haunted',
    price: 2999,
    imageUrl:
      'https://s3.amazonaws.com/purple-pirate-pompadours/Hoodies/Haunted.jpg',
    description:
      "If there's something weird and it don't look good, is this what you're gonna wear?"
  },
  {
    name: 'The Night in the Woods',
    price: 2999,
    imageUrl:
      'https://s3.amazonaws.com/purple-pirate-pompadours/Hoodies/NightSky.jpg',
    description:
      'Let me speak wisdom to you: we begin and we end, at night, in the woods wearing this hoodie.'
  },
  {
    name: 'The Floral',
    price: 2999,
    imageUrl:
      'https://s3.amazonaws.com/purple-pirate-pompadours/Hoodies/Floral.jpg',
    description:
      'This hoodie is like a beautiful flower which I may not touch, but whose fragrance makes the garden a place of delight just the same.'
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
