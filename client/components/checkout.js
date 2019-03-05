import React, {Component} from 'react'
import Payment from './payment'
import {Elements} from 'react-stripe-elements'

export class Checkout extends Component {
  render() {
    return (
      <div>
        <Elements>
          <Payment />
        </Elements>
      </div>
    )
  }
}

export default Checkout
