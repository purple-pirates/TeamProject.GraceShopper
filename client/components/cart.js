import React from 'react'

export function Cart(props) {
  return (
    <div>
      <p>This is the cart</p>
      {/* if user is logged in push to checkout, otherwise push to login */}
      <button type="button" onClick={() => props.history.push('/checkout')}>
        Proceed to Checkout
      </button>
    </div>
  )
}
