import React from 'react'
import {Elements, StripeProvider} from 'react-stripe-elements'
import {Payment} from './payment'

const Checkout = () => {
  return (
    <div>
      <StripeProvider apiKey="pk_test_APN8EikgFCetmHevbZhBh8LD">
        <div className="example">
          <Elements>
            <Payment />
          </Elements>
        </div>
      </StripeProvider>
    </div>
  )
}

export default Checkout
