import React, {Component} from 'react'
import {connect} from 'react-redux'

import {fetchCartItems} from '../store'

export class Cart extends Component {
  componentDidMount() {
    this.props.fetchCartItems()
  }

  render() {
    return (
      <div>
        {this.props.cartItems.length < 1 ? (
          <h1>Your cart is empty</h1>
        ) : (
          this.props.cartItems.map((item, idx) => {
            return (
              <div key={idx}>
                {/* <img src={item.productId.imageUrl} /> */}
                <span>
                  <b>Name: </b>
                  {item.name}
                </span>
                {'  '}
                <span>
                  <b>Quantity: </b> {item.quantity}
                </span>
                {'  '}
                <span>
                  <b>Size: </b> {item.size}
                </span>
              </div>
            )
          })
        )}
        {/* if user is logged in push to checkout, otherwise push to login */}
        {/* <button type="button" onClick={() => props.history.push('/checkout')}>
          Proceed to Checkout
        </button> */}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cartItems: state.cart.cartItems
})

const mapDispatchToProps = dispatch => ({
  fetchCartItems: () => dispatch(fetchCartItems())
})

export const UserCart = connect(mapStateToProps, mapDispatchToProps)(Cart)
