import React from 'react'
import {injectStripe, CardElement} from 'react-stripe-elements'

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {complete: false}
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit = async ev => {
    ev.preventDefault()

    let {token} = await this.props.stripe.createToken({name: 'Name'})
    let response = await fetch('/api/cart/charge', {
      method: 'POST',
      headers: {'Content-Type': 'text/plain'},
      body: token.id
    })
    if (response.ok) {
      this.setState({complete: true})
      await fetch('/api/cart/deleteCart', {
        method: 'DELETE',
        headers: {'Content-Type': 'text/plain'},
        body: token.id
      })
    }
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
