/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('product behavior', () => {
      let hoodie

      beforeEach(async () => {
        hoodie = await Product.create({
          name: 'Black',
          price: 2099,
          imageUrl:
            'https://s3.amazonaws.com/purple-pirate-pompadours/Hoodies/BlackHoodie.jpg',
          description:
            "You can have this hoodie in any color you'd like as long as long it's black.",
          stock: 100
        })
      })

      it('returns true if the name is a string', () => {
        expect(hoodie.name).to.be.a('string')
      })

      it('returns true if price is calculated correctly', () => {
        expect(hoodie.price).to.equal('$20.99')
      })

      it('returns true if stock is decremented correctly', () => {
        hoodie.decrementStock(15)
        expect(hoodie.stock).to.equal(85)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
