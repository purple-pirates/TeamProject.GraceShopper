import React from 'react'
import {injectStripe, CardElement} from 'react-stripe-elements'

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {complete: false}
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit = async ev => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault()

    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    // this.props.stripe.createToken({name: 'Jenny Rosen'}).then(({token}) => {
    //   console.log('Received Stripe token:', token)
    // })

    let {token} = await this.props.stripe.createToken({name: 'Name'})
    let response = await fetch('/api/cart/charge', {
      method: 'POST',
      headers: {'Content-Type': 'text/plain'},
      body: token.id
    })
    if (response.ok) {
      this.setState({complete: true})
    }
    // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});
    // However, this line of code will do the same thing:

    // You can also use createSource to create Sources. See our Sources
    // documentation for more: https://stripe.com/docs/stripe-js/reference#stripe-create-source
    //
    // this.props.stripe.createSource({type: 'card', owner: {
    //   name: 'Jenny Rosen'
    // }});
  }

  render() {
    if (this.state.complete) return <h1>Purchase Complete!</h1>
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button type="button" onClick={this.handleSubmit}>
          Send
        </button>
      </div>
    )
  }
}

export default injectStripe(CheckoutForm)

/*

      <form onSubmit={this.handleSubmit}>
        <AddressSection />
        <CardSection />
        <button>Confirm order</button>
      </form>

import React, {Component} from 'react'
import {CardElement, injectStripe} from 'react-stripe-elements'

class Payment extends Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
  }

  async submit(ev) {
    // User clicked submit
  }

  render() {
    return (
    <div>
      <h1>HELLO</h1>
    </div>
    )
  }
}

export default injectStripe(Payment)

*/
