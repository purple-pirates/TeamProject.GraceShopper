import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {fetchCartItems, removeCartItem, putCartItem} from '../store'
// import {Product} from '../../server/db/models/product'

export class Cart extends Component {
  componentDidMount() {
    this.props.fetchCartItems()
  }

  /*calculate() {
    // get all cart items
    const cart = this.props.fetchCartItems();
    let total = 0;
    cart.forEach(async (cartItem) => {
      const current = await Product.findOne({ where: { id: cartItem.productId }})
      let add = current.price * cartItem.quantity
      total +=  add
    })
    return total
  }*/
  render() {
    return (
      <div>
        {this.props.cartItems.length < 1 ? (
          <h1>Your cart is empty</h1>
        ) : (
          this.props.cartItems.map(item => {
            return (
              <div key={item.id}>
                <span>
                  <b>Name: </b>
                  {item.name}
                </span>
                {'  '}

                <span>
                  <b>Quantity: </b>{' '}
                  <button
                    type="button"
                    onClick={() => this.props.putCartItem(item, 'down')}
                  >
                    -
                  </button>
                  {item.quantity}
                  <button
                    type="button"
                    onClick={() => this.props.putCartItem(item, 'up')}
                  >
                    +
                  </button>
                </span>

                {'  '}
                <span>
                  <b>Size: </b> {item.size}
                </span>
                <button
                  type="button"
                  onClick={() => this.props.removeCartItem(item)}
                >
                  Delete Item
                </button>
              </div>
            )
          })
        )}
        {/* if user is logged in push to checkout, otherwise push to login */}
        {
          <button
            type="button"
            onClick={() => this.props.history.push('/payment')}
          >
            Proceed to Checkout
          </button>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cartItems: state.cart.cartItems
})

const mapDispatchToProps = dispatch => ({
  fetchCartItems: () => dispatch(fetchCartItems()),
  removeCartItem: item => dispatch(removeCartItem(item)),
  putCartItem: (item, change) => dispatch(putCartItem(item, change))
})

export const UserCart = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Cart)
)
