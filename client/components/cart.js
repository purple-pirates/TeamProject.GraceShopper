import React, {Component} from 'react'
import {connect} from 'react-redux'

import {fetchCartItems} from '../store'

export class Cart extends Component {
  componentDidMount() {
    this.props.fetchCartItems()
    // console.log('in cart mount', this.props.cartItems)
  }

  render() {
    return (
      <div>
        <p>This is the caart</p>
        {this.props.cartItems.map((item, idx) => {
          return (
            <div key={idx}>
              <p>{item.quantity}</p>
            </div>
          )
        })}
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
